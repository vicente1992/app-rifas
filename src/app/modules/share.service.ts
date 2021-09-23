import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public userEmit = new EventEmitter<any>();
  constructor(
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
  ) { }

  setUserCookie = (obj) => {
    if (Object.values(obj).length) {
      this.userEmit.emit(obj);
      this.cookieService.set('user', JSON.stringify(obj), environment.daysTokenExpire, '/');
    }
  };
  refreshCookie = () => {
    const user = (this.cookieService.get('user')) ? JSON.parse(this.cookieService.get('user')) : null;
    if (user) {
      this.userEmit.emit(user);
    } else {
      return null;
    }
  };

  setReferenceUser = (obj) => {
    this.cookieService.set('user_reference', JSON.stringify(obj), environment.daysTokenExpire, '/');
  };

  getReferenceUser = () => {
    return (this.cookieService.get('user_reference')) ? JSON.parse(this.cookieService.get('user_reference')) : [];
  };

  randomStr = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };
  loading = (flag = true) => {
    if (flag) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  };
  confirm = (title = '', text = '', ok = '') => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title,
        text,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        customClass: {
          container: 'container-class'
        },
        confirmButtonText: ok
      }).then((result) => {
        if (result.value) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  };
  alert = (title = '', text = '') => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title,
        text,
      }).then(a => {
        resolve(true);
      });
    });
  };

  showError(title = '', message = '') {
    // this.toastr.error(message, title);
  }
}
