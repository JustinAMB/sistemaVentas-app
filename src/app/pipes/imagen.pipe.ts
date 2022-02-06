import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'users'|'products'): string {
    console.log(img);
    const api=environment.api;
      if ( !img ) {
        return `${ api}upload/usuarios/no-image`;
    } else if ( img.includes('https') ) {
        return img;
    } else {
        return `${ api}upload/${ tipo }/${ img }`;
    } 


  }

}
