import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../constants';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  paginatedContacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  pageSize = 5; 
  currentPage = 0;
  private refreshSubscription!: Subscription; // Subscription to manage the interval

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loadContacts();
    this.updatePaginatedContacts();

    // Set up periodic updates every 5 seconds
    this.refreshSubscription = interval(5000)
      .pipe(switchMap(() => this.contactService.getContacts())) // Call the service to fetch contacts
      .subscribe({
        next: (data) => {
          this.contacts = data;
          this.updatePaginatedContacts(); // Update the paginated contacts after fetching new data
        },
        error: (error) => {
          console.error('Error fetching contacts:', error);
        },
      });
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.filteredContacts = [...this.contacts];
        console.log("data", this.contacts)
        this.updatePaginatedContacts();
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      },
    });
  }

  updatePaginatedContacts() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedContacts = this.filteredContacts.slice(start, end); // Use filteredContacts here
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePaginatedContacts();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedContacts();
    }
  }

  goToNextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.contacts.length) {
      this.currentPage++;
      this.updatePaginatedContacts();
    }
  }

  goToContactDetails(contact: Contact) {
    console.log("setting value", contact)
    this.contactService.setSelectedContact(contact)
    this.router.navigate(['/detail', contact.id]);
  }

  onSearch(searchTerm: string): void {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumbers.some(phone => phone.includes(searchTerm)) || 
      contact.emailAddresses.some(email => email.includes(searchTerm)) 
    );

    this.currentPage = 0;
    this.updatePaginatedContacts(); // Update pagination after filtering
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe(); // Clean up the subscription when the component is destroyed
    }
  }
}
