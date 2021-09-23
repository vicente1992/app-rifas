import { FilePreviewModel, UploadResponse, UploadStatus } from 'ngx-awesome-uploader';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FilePickerAdapter } from 'ngx-awesome-uploader';
import { environment } from 'src/environments/environment';


export class Filepicker extends FilePickerAdapter {
  constructor(
    private http: HttpClient,

  ) {
    super();
  }
  public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    const form = new FormData();
    form.append('file', fileItem.file);
    // const api = 'https://ngx-awesome-uploader-2.free.beeceptor.com/upload';
    const api = `${environment.api}/storage`;
    const req = new HttpRequest('POST', api, form, { reportProgress: true });
    return this.http.request(req).pipe(
      map((res) => {
        if (res.type === HttpEventType.Response) {
          const responseFromBackend = res.body;
          return {
            body: responseFromBackend,
            status: UploadStatus.UPLOADED
          };
        } else if (res.type === HttpEventType.UploadProgress) {
          const uploadProgress = +Math.round((100 * res.loaded) / res.total);
          return {
            status: UploadStatus.IN_PROGRESS,
            progress: uploadProgress
          };
        }
      }),
      catchError(er => {
        console.log(er);
        return of({ status: UploadStatus.ERROR, body: er });
      })
    );
  }

  public removeFile(fileItem): Observable<any> {
    return of({});
  }
}
