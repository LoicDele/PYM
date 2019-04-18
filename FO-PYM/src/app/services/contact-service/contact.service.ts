import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../class/contact/contact';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  urlContact: string = "http://127.0.0.1:8000/api/contacts";
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


