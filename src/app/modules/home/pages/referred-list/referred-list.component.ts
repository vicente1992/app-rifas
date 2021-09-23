import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-referred-list',
  templateUrl: './referred-list.component.html',
  styleUrls: ['./referred-list.component.css']
})
export class ReferredListComponent implements OnInit {
  data: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private rest: RestService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.load(id);
    });
  }

  load(id: string) {
    this.rest.get(`afiliate/${id}`).subscribe(response => {
      this.data = response;
    })
  }


}
