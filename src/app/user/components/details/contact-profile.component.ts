import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.scss']
})
export class ContactProfileComponent implements OnInit, OnDestroy {
  contact!: Contact;
  contactId!: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getContactId();

    if (this.contactId) {
      this.getContact();
    } else {
      this.ngOnDestroy();
    }
  }

  getContactId() {
    this.contactId = this.route.snapshot.paramMap.get('id')!;
  }

  getContact() {
    this.contactService.getContact(this.contactId).subscribe({
      next: (data) => {
        this.contact = data;
        console.log("contact data", this.contact);
      },
      error: (error) => {
        console.error('Error fetching contact details:', error);
      },
    });
  }

  ngOnDestroy(): void {
    // Clean-up logic here
  }
}
