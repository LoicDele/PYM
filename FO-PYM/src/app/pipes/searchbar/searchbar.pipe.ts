import { Pipe, PipeTransform } from '@angular/core';
import { Entreprise } from 'src/app/class/entreprise/entreprise';

@Pipe({
  name: 'searchbar'
})
export class SearchbarPipe implements PipeTransform {

  transform(entreprises: Array<Entreprise>, text: string): Array<Entreprise> {
    if (!text) {
      return [];
    }
    if (!entreprises) {
      return [];
    }

    return entreprises.filter(item => { return item.nom.toLowerCase().includes(text.toLowerCase()) });
  }

}
