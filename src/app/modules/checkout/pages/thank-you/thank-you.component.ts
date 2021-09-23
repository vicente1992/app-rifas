import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
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
export class ThankYouComponent implements OnInit {
  public data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
