import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { ContactForm } from '../interfaces/contactForm';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private apiContactForm = 'http://localhost:8080/api/ContactForm';
  private contactFormsUpdated = new Subject<ContactForm[]>();

  constructor(private http: HttpClient) { }

  getActiveContactForms(): Observable<ContactForm[]> {
    return this.http.get<ContactForm[]>(`${this.apiContactForm}/active`);
  }

  postData(contactForm: ContactForm): Observable<Object> {
    return this.http.post(this.apiContactForm, contactForm);
  }

  obtenerContactFormPorId(id: string): Observable<ContactForm> {
    return this.http.get<ContactForm>(`${this.apiContactForm}/${id}`);
  }

  eliminarContactForm(id: string): Observable<Object> {
    // Aquí realizamos el eliminado lógico, cambiando el estado del usuario a inactivo
    return this.http.delete(`${this.apiContactForm}/${id}`);
  }

  activarContactForm(id: string): Observable<Object> {
    return this.http.put(`${this.apiContactForm}/reactivate/${id}`, {});
  }
  restoreContactForm(id: string): Observable<Object> {
    return this.http.put(`${this.apiContactForm}/reactivate/${id}`, {});
  }

  deletePermanently(id: string): Observable<Object> {
    return this.http.delete(`${this.apiContactForm}/fisico/${id}`).pipe(
      tap(() => {
        // Emitir actualización después de eliminar permanentemente
        this.contactFormsUpdated.next([]);
      })
    );
  }


  getInactivos(): Observable<ContactForm[]> {
    return this.http.get<ContactForm[]>(`${this.apiContactForm}/inactive`);
  }

  obtenerContactFormPorCelular(celular: string): Observable<ContactForm> {
    return this.http.get<ContactForm>(`${this.apiContactForm}/buscarPorCelular/${celular}`);
  }
  // crearUsuario(contactForm: ContactForm): Observable<ContactForm> {
  //   return this.http.post<ContactForm>(this.apiContactForm, contactForm);
  // }

  actualizarContactForm(id: string, contactForm: ContactForm): Observable<ContactForm> {
    return this.http.put<ContactForm>(`${this.apiContactForm}/${id}`, contactForm).pipe(
      tap((updatedContactForm: ContactForm) => {
        this.contactFormsUpdated.next([updatedContactForm]);
      })
    );
  }

  // crearUsuario(contactForm: ContactForm): Observable<ContactForm> {
  //   return this.http.post<ContactForm>(this.apiContactForm, contactForm).pipe(
  //     tap((newContactForm: ContactForm) => {
  //       this.contactFormsUpdated.next([newContactForm]);
  //     })
  //   );
  // }
  
  crearUsuario(contactForm: ContactForm): Observable<ContactForm> {
    return this.http.post<ContactForm>(this.apiContactForm, contactForm).pipe(
      tap((updatedContactForm: ContactForm) => {
        this.contactFormsUpdated.next([updatedContactForm]);
        // Aquí deberías obtener la lista actual de usuarios y agregar el nuevo usuario
        this.getActiveContactForms().subscribe((contactForms: ContactForm[]) => {
          this.contactFormsUpdated.next(contactForms);
        });
      })
    );
  }


  obtenerContactFormPorDocumento(documentNumber: string): Observable<ContactForm> {
    return this.http.get<ContactForm>(`${this.apiContactForm}/buscarPorDocumento/${documentNumber}`);
  }

  getContactFormsUpdateListener() {
    return this.contactFormsUpdated.asObservable();
  }

  
}
