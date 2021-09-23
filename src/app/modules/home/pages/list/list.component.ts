import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Raffle } from '../../interfaces/raffle.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
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
export class ListComponent implements OnInit {
  raffles: Raffle[] = [];
  constructor(
    private rest: RestService

  ) { }

  ngOnInit(): void {
    this.getRaffles();
  }

  getRaffles() {
    this.rest.get('raffle/all').subscribe(response => {
      this.raffles = response;
    })
  }

  deleteRafle(raffle: Raffle) {
    this.rest.delete(`raffle/${raffle._id}`).subscribe(response => {
      this.getRaffles();
    })
  }

}



