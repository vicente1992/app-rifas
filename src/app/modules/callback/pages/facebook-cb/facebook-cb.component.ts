import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ShareService } from 'src/app/modules/share.service';
import { RestService } from 'src/app/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-facebook-cb',
  templateUrl: './facebook-cb.component.html',
  styleUrls: ['./facebook-cb.component.css']
})
export class FacebookCbComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private rest: RestService,
    private cookieService: CookieService,
    private router: Router,
    private share: ShareService,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(a => {
      if (a.code) {
        this.rest.get(`pre-social?code=${a.code}&provider=facebook`).subscribe((b) => {
          this.redirect(b);
        }, e => this.redirectOauth());
      } else {
        this.redirectOauth();
      }

    });
  }

  redirectOauth = () => {
    this.router.navigate(['/', 'list']);
  };

  redirect = (a) => {
    try {
      if (a.token) {
        this.cookieService.set('session', a.token, environment.daysTokenExpire, '/');
        this.cookieService.set('user', JSON.stringify(a.user), environment.daysTokenExpire, '/');
        this.router.navigate(['/', 'home']);
      } else {
        let body = {
          name: a.name,
          email: a.email,
          avatar: a.photoUrl,
          password: this.share.randomStr(),
          provider: {
            authToken: a.authToken,
            idToken: a.idToken,
            provider: a.provider.toLowerCase(),
            id: a.id
          },
        }
        this.rest.post('register', body).subscribe(a => {
          this.cookieService.set('session', a.token, environment.daysTokenExpire, '/');
          this.share.setUserCookie(a.user);
          this.router.navigate(['/', 'home']);
        },
          error => console.log(error));

      }
      //

    } catch (e) {
      this.redirectOauth();
    }

  };
}

