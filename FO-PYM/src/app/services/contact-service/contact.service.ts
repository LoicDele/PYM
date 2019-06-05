import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../class/contact/contact';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  urlContact: string = environment.api + "contacts";;
  contacts: Contact[];
  subjectContacts = new Subject<Contact[]>();
  constructor(private httpClient: HttpClient) { }

  requestHTTP() {
    return this.httpClient.get<Contact[]>(this.urlContact);
  }
  getContactByHTTP() {
    this.requestHTTP().subscribe(res => {
      this.contacts = res;
      this.subjectContacts.next(this.contacts);
    });
  }
}


