import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { Raffle } from '../../interfaces/raffle.interface';
import { Tickect } from '../../interfaces/ticket.interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  data: Raffle;
  selectedTicket: any = [];
  total: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rest: RestService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.load(params.slug);
    });
  }
  load(slug: string) {
    this.rest.get(`raffle/slug/${slug}`).subscribe(response => {
      this.data = response;
    })
  }

  selectedNumber(tickect: Tickect) {
    const element = <HTMLInputElement>document.getElementById(tickect.value);
    const isChecked = element.checked;

    isChecked ? this.total += Number(tickect.price) : this.total -= Number(tickect.price);
    if (!isChecked) return this.selectedTicket = this.selectedTicket.filter((item) => item.value !== tickect.value);

    const tickectFind = this.data.tickects.find((item) => item.value === tickect.value)
    this.selectedTicket.push(tickectFind);

  }

  toPay() {
    let tickect = {
      amount: this.total,
      idRaffle: this.data._id,
      tickects: this.selectedTicket
    }
    this.rest.post(`tickect`, tickect).subscribe(response => {
      this.router.navigate(['/', 'checkout', 'process', this.data.slug, response._id])
    }, error => console.log(error))

  }

}
