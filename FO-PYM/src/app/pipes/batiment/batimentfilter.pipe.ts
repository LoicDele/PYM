import { Pipe, PipeTransform } from '@angular/core';
import { Batiment } from 'src/app/class/batiment/batiment';

@Pipe({
  name: 'batimentfilter'
})
export class BatimentfilterPipe implements PipeTransform {

  transform(batiments: Array<Batiment>): Array<Batiment> {
    if(!batiments){
      return null;
    }
    return batiments.filter(item => item.type.includes("batiment") || item.type.includes("Forme Paramétrique"));
  }

}

