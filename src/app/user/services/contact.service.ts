import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact} from '../constants'
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacts`;
  constructor(private http: HttpClient) { }

  // remove the behavior subject and the code that uses it
  private selectedContactSubject = new BehaviorSubject<Contact | null>(null);
  selectedContact$ = this.selectedContactSubject.asObservable();

  setSelectedContact(contact: Contact) {
    this.selectedContactSubject.next(contact);
  }

  getSelectedContact(): Contact | null {
    return this.selectedContactSubject.value;
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }



  getContact(ID: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${ID}/email_addresses`);
  }
}
