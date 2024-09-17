import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './global/components/sidebar/sidebar.component';
import { StudentListComponent } from './features/master/components/student/student-list/student-list.component';
import { ContactFormService } from './features/web/components/services/contactForm.service';
import { AgregarContactFormComponent } from './features/web/components/contactForm/agregar-contactForm/agregar-contactForm.component';
import { ContactFormComponent } from './features/web/components/contactForm/contactForm.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './features/web/components/landing-page/landing-page.component';
import { StudentFormComponent } from './features/master/components/student/student-form/student-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TopbarComponent } from './global/components/topbar/topbar.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ApiReniecService } from './features/master/services/api-reniec.service';
import { StudentDetailsComponent } from './features/master/components/student/student-details/student-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AgregarContactFormComponent,
    ContactFormComponent,
    SidebarComponent,
    StudentListComponent,
    StudentFormComponent,
    ContactFormComponent,
    TopbarComponent,
    StudentDetailsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule, // Asegúrate de que el módulo de enrutamiento esté importado
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ApiReniecService,
    ContactFormService,
    NgbModal,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
