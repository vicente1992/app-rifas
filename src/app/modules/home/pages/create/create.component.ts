import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilePreviewModel } from 'ngx-awesome-uploader';
import { Filepicker } from 'src/app/modules/filepicker.adapter';
import { RestService } from 'src/app/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Raffle } from '../../interfaces/raffle.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
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
  ],
})
export class CreateComponent implements OnInit {
  loadingIn: boolean = false;
  addForm: FormGroup;
  adapter = new Filepicker(this.http);
  public cover: any = null;
  raffles: Raffle;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private rest: RestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      amountNumber: ['', [Validators.required, Validators.min(1),]],
      description: [''],
      avatar: ['', Validators.required],
    });


    this.activatedRoute.params.subscribe(params => {
      if (!params.id) return
      this.load(params.id);
    });
  }
  load(id: string) {
    this.rest.get(`raffle/${id}`).subscribe(response => {
      this.raffles = response;
      this.addForm.patchValue(response);
    })
  }
  onFileAdded(file: FilePreviewModel) {
    const reader = new FileReader();
    reader.readAsDataURL(file.file);
    reader.onload = (event) => {
      this.cover = event.target.result;
    };
  }
  removeSuccess = (e) => {
    this.addForm.patchValue({ avatar: null });
    this.cover = null;
  };
  onSuccess = (a) => {
    if (a.uploadResponse) {
      const { url } = a.uploadResponse;
      this.addForm.patchValue({ avatar: `${url}` });
    }
  };


  submit() {
    this.loadingIn = true;
    const tickects = [];
    const { price, amountNumber } = this.addForm.value;
    let totalNumber = Number(amountNumber);
    for (let i = 1; i <= totalNumber; i++) {
      tickects.push({
        value: i < 10 ? `0${i}` : `${i}`,
        price
      })
    }
    let body = {
      ...this.addForm.value,
      tickects
    }

    if (this.raffles) {
      this.rest.patch(`raffle/${this.raffles._id}`, body).subscribe(response => {
        this.loadingIn = false;
        this.router.navigate(['/', 'home']);
      },
        error => {
          console.log(error), this.loadingIn = false;
        });
    } else {
      this.rest.post('raffle', body).subscribe(response => {
        this.loadingIn = false;
        this.router.navigate(['/', 'home']);
      },
        error => {
          console.log(error), this.loadingIn = false;
        });
    }
  }

}
