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
import { BatimentViewComponent } from './components/batiment-view/batiment-view.component';
import { BureauViewComponent } from './components/bureau-view/bureau-view.component';
import { FooterViewComponent } from './components/footer-view/footer-view.component';
import { CGUComponent } from './components/cgu/cgu.component';
//Services
import {EntrepriseService} from './services/entreprise-service/entreprise.service';
import { ContactService } from './services/contact-service/contact.service';
import { BatimentService } from './services/batiment-service/batiment.service';
import { BureauService } from './services/bureau-service/bureau.service';
//Pipes
import { ContactfilterPipe } from './pipes/contact/contactfilter.pipe';
import { BureaufilterPipe } from './pipes/bureau/bureaufilter.pipe';
import { BatimentfilterPipe } from './pipes/batiment/batimentfilter.pipe';
import { SearchbarPipe } from './pipes/searchbar/searchbar.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SemagHeaderComponent,
    SemagViewComponent,
    EntrepriseViewComponent,
    ContactViewComponent,
    ContactfilterPipe,
    BatimentViewComponent,
    BureauViewComponent,
    BureaufilterPipe,
    BatimentfilterPipe,
    FooterViewComponent,
    CGUComponent,
    SearchbarPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [EntrepriseService, ContactService, BatimentService, BureauService],
  bootstrap: [AppComponent]
})
export class AppModule { }
