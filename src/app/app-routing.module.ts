import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './global/components/sidebar/sidebar.component';
import { ContactFormComponent } from './features/web/components/contactForm/contactForm.component';
import { LandingPageComponent } from './features/web/components/landing-page/landing-page.component';
import { StudentListComponent } from './features/master/components/student/student-list/student-list.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'sidebar', component: SidebarComponent},
  { path: 'contactForm', component:ContactFormComponent },
  { path: 'studentList', component: StudentListComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
