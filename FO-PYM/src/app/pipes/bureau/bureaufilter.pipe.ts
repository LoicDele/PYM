import { Pipe, PipeTransform } from '@angular/core';
import { Bureau } from 'src/app/class/bureau/bureau';

@Pipe({
  name: 'bureaufilter'
})
export class BureaufilterPipe implements PipeTransform {

  transform(bureaux: Array<Bureau>, idBat: number): Array<Bureau> {
    if(!idBat){
      return bureaux;
    }
    if(!bureaux){
      return null;
    }
    return bureaux.filter(item => item.idBatiment === idBat);
  }

}
