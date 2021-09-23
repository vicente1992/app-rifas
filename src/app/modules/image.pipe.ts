import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const api = environment.api;
@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string): string {
    if (!image) return null
    const img = `${api}/storage/${image.trim()}`;
    return img ? img : './assets/img/no-image.jpg';
  }

}
