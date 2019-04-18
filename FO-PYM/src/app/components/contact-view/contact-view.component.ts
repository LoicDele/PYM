import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../class/contact/contact';
import { ContactService } from 'src/app/services/contact-service/contact.service';
import { Subscription } from 'rxjs';
import { PopoverModule } from 'ngx-popover';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})

export class ContactViewComponent implements OnInit {
  @Input() idEnt: number;
  contacts: Contact[];
  subscriptionContact: Subscription;
  imports: PopoverModule;
  constructor(private contactService: ContactService) {
  }


  ngOnInit() {
    this.subscriptionContact = this.contactService.subjectContacts.subscribe(res => { this.contacts = res; });
    this.contactService.getContactByHTTP();
  }

}

