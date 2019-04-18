import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/class/contact/contact';

@Pipe({
  name: 'contactfilter'
})
export class ContactfilterPipe implements PipeTransform {

  transform(contacts: Array<Contact>, idEnt: number): Array<Contact> {
    if(!idEnt){
      return contacts;
    }
    if(!contacts){
      return null;
    } 
    return contacts.filter(item => item.idEntreprise === idEnt);
  }

}
