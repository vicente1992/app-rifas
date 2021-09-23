import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { Raffle } from '../../interfaces/raffle.interface';
import { environment } from 'src/environments/environment';
import { ShareService } from 'src/app/modules/share.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  animations: [
    trigger('swipe', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: '0' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'translateY(20%)', opacity: '1' }))
      ])
    ])
  ]
})
export class DetailComponent implements OnInit {

  raffles: Raffle;
  dataUser: any;
  urlImage: string = '';
  shareFacebook: string = environment.shareFacebook;
  url: string = window.location.href;
  constructor(
    private activatedRoute: ActivatedRoute,
    private rest: RestService,
    private share: ShareService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.share.userEmit.subscribe(user => this.dataUser = user);
    this.share.refreshCookie();
    this.activatedRoute.params.subscribe(params => {
      this.load(params.slug);
    });


  }
  load(slug: string) {
    this.rest.get(`raffle/slug/${slug}`).subscribe(response => {
      this.raffles = response;
      this.linkImg(this.raffles.avatar);
    })
  }
  linkImg(image) {
    if (!image) return
    const urlImage = image;
    const api = environment.api;
    this.urlImage = `${api}/storage/${urlImage.trim()}`;

  }

  deleteRafle(raffle: Raffle) {
    this.share.confirm('Eliminar', 'Estas seguro de querer eliminar esta rifa?', 'OK').then(r => {
      this.rest.delete(`raffle/${raffle._id}`).subscribe(response => {
        this.router.navigate(['', '/home'])
      })
    })
      .catch(e => {
        console.log(e);
      });
  }

  shareLink() {
    const origin = window.location.origin;
    if (this.dataUser) {
      // this.shareFacebook += `${this.url}?ref=${this.dataUser.code}`;
      this.shareFacebook += `${origin}?ref=${this.dataUser.code}`;
      return window.open(this.shareFacebook, '_blank');
    }
    // this.shareFacebook += `${this.url}`;
    this.shareFacebook += `${origin}`;
    window.open(this.shareFacebook, '_blank');
  }

}


