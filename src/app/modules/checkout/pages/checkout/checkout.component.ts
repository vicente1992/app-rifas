import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Raffle } from 'src/app/modules/home/interfaces/raffle.interface';
import { ScriptService } from 'src/app/modules/script.service';
import { ShareService } from 'src/app/modules/share.service';
import { RestService } from 'src/app/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('swipe', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: '0' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'translateY(20%)', opacity: '1' }))
      ])
    ]),
    trigger('swipeR', [
      transition(':enter', [
        style({ transform: 'translate(14%, 0px)', opacity: '0' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'translate(14%, 0px)', opacity: '1' }))
      ])
    ])
  ]
})
export class CheckoutComponent implements OnInit {
  addForm: FormGroup;
  public loading = false;
  public amount: 0;
  public data: any;
  public idOrder: string;
  private STRIPE: any;
  private elementStripe: any = null;
  private cardObject: any = null;
  urlImage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private rest: RestService,
    private translate: TranslateService,
    private scripS: ScriptService,
    private router: Router,
    private share: ShareService
  ) { }

  ngOnInit(): void {
    this.loadScripts();
    this.addForm = this.formBuilder.group({
      to: ['', Validators.required],
      card_holder: ['', Validators.required],
      // description: ['', [Validators.required,
      // Validators.minLength(7)]],
      amount: ['', [
        Validators.required,
        Validators.min(environment.amounts.min),
        Validators.maxLength(4),
        Validators.minLength(1),
        Validators.max(environment.amounts.max)
      ]]
    });
    this.activatedRoute.params.subscribe(params => {
      this.load(params.slug);
      this.idOrder = params.idOrder;
    });

  }
  load(slug: string) {
    this.rest.get(`raffle/slug/${slug}`).subscribe(response => {
      this.data = response;
      this.linkImg();
      this.getTickect();
    })
  }

  getTickect() {
    const { user = {} } = this.data;
    this.rest.get(`tickect/${this.idOrder}`).subscribe(response => {
      this.addForm.patchValue({ amount: response.amount });
      this.addForm.patchValue({ to: user._id });
    })
  }

  private loadScripts = () => {
    this.scripS.load('stripe').then((data: any) => {
      if (data) {
        data.map(a => {
          if (a.script === 'stripe') {
            // @ts-ignore
            this.STRIPE = window.Stripe(environment.stripe_pk);
            this.createStripeElement();
          }
        });
      }
    }).catch(error => console.log(error));
  };
  private createStripeElement = () => {
    this.elementStripe = this.STRIPE.elements({
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Baloo+Thambi+2:400,500|Roboto:400,500&display=swap',
        }
      ]
    });

    let cardNumberLabel = '';
    let cardEXP = '';
    let cardCVC = '';
    this.translate.get('CARD.CARD_NUMBER').subscribe((res: string) => {
      cardNumberLabel = res;
    });
    this.translate.get('CARD.CARD_EXP').subscribe((res: string) => {
      cardEXP = res;
    });
    this.translate.get('CARD.CARD_CVC').subscribe((res: string) => {
      cardCVC = res;
    });
    const stripeStyle = {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '37px',
          fontFamily: '\'Baloo Thambi 2\', cursive',
          fontSize: '1.2rem',
          // fontStyle: 'italic',
          textAlign: 'center',
          '::placeholder': {
            color: '#c7c3c3',
          },
        },
      },
      placeholder: cardNumberLabel
    };
    const cardNumber = this.elementStripe.create('cardNumber', stripeStyle);
    const cardExp = this.elementStripe.create('cardExpiry', { ...stripeStyle, ...{ placeholder: cardEXP } });
    const cardCvc = this.elementStripe.create('cardCvc', { ...stripeStyle, ...{ placeholder: cardCVC } });
    cardNumber.mount('#card_number');
    cardExp.mount('#card_exp');
    cardCvc.mount('#card_cvc');
    this.cardObject = cardNumber;
  };
  disableAll = () => this.addForm.disable();

  enableAll = () => this.addForm.enable();
  onSubmit = () => this.beginProcess();


  // clickAction = () => {
  //   this.router.navigate(['/', 'checkout', 'thankyou', '333333']);
  // };


  linkImg() {
    if (!this.data.avatar) return
    const urlImage = this.data.avatar;
    const api = environment.api;
    this.urlImage = `${api}/storage/${urlImage.trim()}`;

  }

  beginProcess = () => {
    this.disableAll();
    this.loading = true;
    this.STRIPE.createToken(this.cardObject)
      .then(res => {
        this.loading = false;
        this.enableAll();
        if (res.error) {
          throw res;
        } else {
          this.payIntent(res.token.id);
        }
      })
      .catch(err => {
        this.loading = false;
        this.share.alert('Error', err.error.message);
        this.enableAll();
      });
  };

  payIntent = (token) => {
    this.loading = true;
    const { to, amount, description } = this.addForm.value;
    this.rest.post('payintent', {
      token,
      amount,
      to,
      description
    }).subscribe(response => {
      this.loading = false;
      this.handlePi(response.customData.client_secret)
        .then(r => {
          this.loading = false;
          this.updatePay(response);
        }).catch(err => {
          this.loading = false;
          this.share.alert('Error', err.errors.msg);
        });
    }, err => this.loading = false)
  };

  handlePi = (pi = '') => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.STRIPE.handleCardPayment(pi,
        this.cardObject,
        {
          payment_method_data: {}
        }
      ).then(a => {
        this.loading = false;
        if (a.error) {
          reject(a.error);
        } else {
          resolve(a);
        }
      }).catch(err => {
        this.loading = false;
        reject(err);
      });
    });
  };
  updatePay = (obj) => {
    this.loading = true;
    let body = {
      idOperation: obj.idOperation
    }
    this.rest.patch(`tickect/${this.idOrder}`, body).subscribe(a => {
      this.loading = false;
      this.router.navigate(['/', 'checkout', 'thankyou', a._id]);
    }, err => this.loading = false);

  };
}
