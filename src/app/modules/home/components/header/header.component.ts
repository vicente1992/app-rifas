import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ShareService } from 'src/app/modules/share.service';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public data: any;
  public menu: any;
  constructor(
    private share: ShareService,
    private rest: RestService
  ) { }

  ngOnInit(): void {

    this.share.userEmit.subscribe(a => this.data = a);
    this.share.refreshCookie();

  }
  logOut = () => {
    this.rest.clearSession();
  };

}
