import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { SemagHeaderComponent } from './components/semag-header/semag-header.component';
import { SemagViewComponent } from './components/semag-view/semag-view.component';
import { EntrepriseViewComponent } from './components/entreprise-view/entreprise-view.component';
import { ContactViewComponent } from './components/contact-view/contact-view.component';
//Services
import {EntrepriseService} from './services/entreprise-service/entreprise.service';
import { ContactService } from './services/contact-service/contact.service';
import { BatimentService } from './services/batiment-service/batiment.service';
//Pipes
import { ContactfilterPipe } from './pipes/contact/contactfilter.pipe';
import { BatimentViewComponent } from './components/batiment-view/batiment-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SemagHeaderComponent,
    SemagViewComponent,
    EntrepriseViewComponent,
    ContactViewComponent,
    ContactfilterPipe,
    BatimentViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [EntrepriseService, ContactService, BatimentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
