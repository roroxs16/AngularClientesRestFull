import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientsComponent } from './components/clients/clients.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from "@angular/forms";

//services
import { ClientService } from './services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/clients/form.component';


const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'clients/form', component: FormComponent },
  {path: 'clients/form/:id', component: FormComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DirectivaComponent,
    ClientsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
