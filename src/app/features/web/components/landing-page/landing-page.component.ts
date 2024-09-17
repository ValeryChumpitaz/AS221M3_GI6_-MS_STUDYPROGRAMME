import { Component, ViewEncapsulation } from '@angular/core';
import { ContactFormService } from 'src/app/features/web/components/services/contactForm.service';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms'; // Importa FormControl y Validators
import { Router } from '@angular/router';
import { StudyProgramme } from './../interfaces/study-programme';
import { StudyProgrammeService } from '../services/study-programme.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LandingPageComponent { 
  title = 'CETPRO';

  contactForm: any = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    numeroCelular: '',
    correo: '',
    programaEstudio: '',
    descripcion: '',
    tipoDocumento: '',
    numeroDocumento: ''
  };

  forbiddenWords = ['carajo', 'maldición', 'huevada', 'xd', 'mrd'];
  formSubmitted = false;
  programaEstudioControl = new FormControl('', Validators.required);
  studyProgrammes: StudyProgramme[] = []; // Array para almacenar los programas de estudio


  constructor(private contactFormService: ContactFormService, private studyProgrammeService: StudyProgrammeService, private router: Router) {
    this.getStudyPrograms();
  }

  getStudyPrograms() {
    this.studyProgrammeService.getActiveStudyProgramme().subscribe(data => {
      this.studyProgrammes = data;
    }, error => {
      console.error('Error al obtener programas de estudio', error);
    });
  }

  onSubmit() {
    if (this.isDescriptionValid() && this.isDocumentNumberValid()) {
      const contactForm = {
        id: '',  // Inicializado en vacío, será manejado por el backend
        name: this.contactForm.nombre,
        lastname_paternal: this.contactForm.apellidoPaterno,
        lastname_maternal: this.contactForm.apellidoMaterno,
        birthdate: '',  // Asegúrate de manejar la fecha de nacimiento si es necesario
        document_type: this.contactForm.tipoDocumento,
        documentNumber: this.contactForm.numeroDocumento,
        phone: this.contactForm.numeroCelular,
        phone_optional: '',  // Inicializado en vacío, si no es requerido
        email: this.contactForm.correo,
        studyProgramId: '',  // Agrega el id del programa de estudio según sea necesario
        description: this.contactForm.descripcion,  // Agrega la descripción según sea necesario
        status: 'A',
      };
      

      // Enviar el usuario al servicio ContactFormService para crearlo en el backend
      this.contactFormService.crearUsuario(contactForm).subscribe(
        responseContactForm => {
          Swal.fire('Usuario creado', 'El usuario ha sido creado exitosamente', 'success');
          this.resetForm();  // Limpiar el formulario después de éxito
        },
        error => {
          console.error('Error al crear el usuario', error);
          Swal.fire('Error', 'Hubo un error al crear el usuario', 'error');
        }
      );
      this.resetForm(); // Limpia el formulario después de enviar

  
    } else {
      this.showWarningModal();
    }
  }

  onCelularChange(celular: string) {
    this.contactFormService.obtenerContactFormPorCelular(celular).subscribe(
      (contactFormData) => {
        this.contactForm.nombre = contactFormData.name;
        this.contactForm.apellidoPaterno = contactFormData.lastname_paternal;
        this.contactForm.apellidoMaterno = contactFormData.lastname_maternal;
        this.contactForm.correo = contactFormData.email;
        this.contactForm.tipoDocumento = contactFormData.document_type;
        this.contactForm.numeroDocumento = contactFormData.documentNumber;
      
        // Puedes rellenar otros campos según los datos obtenidos
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  onDocumentoChange(documento: string) {
    this.contactFormService.obtenerContactFormPorDocumento(documento).subscribe(
      (contactFormData) => {
        this.contactForm.nombre = contactFormData.name;
        this.contactForm.apellidoPaterno = contactFormData.lastname_paternal;
        this.contactForm.apellidoMaterno = contactFormData.lastname_maternal;
        this.contactForm.numeroCelular = contactFormData.phone;
        this.contactForm.correo = contactFormData.email;
        this.contactForm.tipoDocumento = contactFormData.document_type;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  resetForm() {
    this.contactForm = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      numeroCelular: '',
      correo: '',
      programaEstudio: '',
      descripcion: '',
      tipoDocumento: '',
      numeroDocumento: ''
    };

  }

  isDescriptionValid(): boolean {
    const value = this.contactForm.descripcion.toLowerCase();
    for (const word of this.forbiddenWords) {
      if (value.includes(word)) {
        return false;
      }
    }
    return true;
  }

  isDocumentNumberValid(): boolean {
    const { tipoDocumento, numeroDocumento } = this.contactForm;
    if (tipoDocumento === 'DNI' && numeroDocumento.length !== 8) {
      return false;
    }
    if (tipoDocumento === 'CNE' && numeroDocumento.length !== 15) {
      return false;
    }
    return true;
  }

  showWarningModal() {
    Swal.fire({
      title: '¡Advertencia!',
      text: 'La palabra inapropiada no está permitida en la descripción o el número de documento no es válido.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }

  getDocumentNumberClasses() {
    const { tipoDocumento, numeroDocumento } = this.contactForm;
    if (
      (tipoDocumento === 'DNI' && numeroDocumento.length !== 8) ||
      (tipoDocumento === 'CNE' && numeroDocumento.length !== 15)
    ) {
      return 'is-invalid';
    }
    return '';
  }
  convertToUppercase(field: string): void {
    const value = this.contactForm.get(field)?.value;
    if (value) {
      this.contactForm.get(field)?.setValue(value.toUpperCase(), { emitEvent: false });
    }
  }

}
