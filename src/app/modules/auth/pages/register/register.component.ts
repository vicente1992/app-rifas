import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public loggedIn = false;
  public modalSocial = true;
  loadingIn: any = false;
  public providerSocial: any = null;
  href = 'https://localhost:4200/oauth/register'

  hash = (environment.hash) ? '/' : '/#/';

  public fbRedirect = [
    'https://www.facebook.com/v6.0/dialog/oauth?',
    `client_id=${environment.fbId}`,
    // `&redirect_uri=${window.location.origin}${this.hash}${environment.fbRedirect}`,
    `&redirect_uri=${window.location.origin}${this.hash}${environment.fbRedirect}`,
    '&scope=email'
  ].join('');
  constructor(
    private rest: RestService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(user => {
      this.providerSocial = user;
    });

    this.rest.checkSession(true, false)
      .then(b => {
        this.router.navigate(['/', 'home']);
      });
  }

  fbLogin = () => {
    this.loadingIn = true;
    try {
      this.rest.get(`oauth-social?provider=facebook`)
        .subscribe(a => {
          window.location.href = a.data;
        }, error => this.loadingIn = false);
    } catch (e) {
      return null;
    }
  };

}
