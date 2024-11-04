import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './user/components/lists/contact-list.component';
import { ContactProfileComponent } from './user/components/details/contact-profile.component';


const routes: Routes = [
  { path: 'contact-list', component: ContactListComponent },
  { path: 'detail/:id', component: ContactProfileComponent },
  { path: '', redirectTo: '/contact-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/contact-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
