import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactFormService } from 'src/app/features/web/components/services/contactForm.service';
import { ContactForm } from 'src/app/features/web/components/interfaces/contactForm'
import { StudyProgramme } from 'src/app/features/web/components/interfaces/study-programme';
import { StudyProgrammeService } from 'src/app/features/web/components/services/study-programme.service';
import * as moment from 'moment';

@Component({
  selector: 'app-agregar-contactForm',
  templateUrl: './agregar-contactForm.component.html',
  styleUrls: ['./agregar-contactForm.component.css']
})
export class AgregarContactFormComponent implements OnInit {
  @Output() contactFormtAdd = new EventEmitter<void>();
  @Input() selectContactFormForEdit: ContactForm | null = null;
  contactFormfrom: FormGroup;
  showForm = false;
  currentStep: number = 1;
  studyProgrammes: StudyProgramme[] = [];
  contactForms: ContactForm[] = [];
  studyProgramIdMessage = '';
  studyProgramIdColor = '';
  descriptionMessage = '';
  descriptionColor = '';
  forbiddenWords = ['xd', 'carajo', 'pendejo', 'mrd', 'puto', 'chivo', 'csm', 'verga', 'pico', 'pene', 'pendeja', 'pendejo', 'marica', 'maricon', 'maricón', 'marica', 'maricona', 'maricona'];

  constructor(
    private fb: FormBuilder,
    private contactFormService: ContactFormService,
    private studyProgrammeService: StudyProgrammeService
  ) {
    this.contactFormfrom = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      lastname_paternal: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      lastname_maternal: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      birthdate: ['', [Validators.required, this.ageValidator(14)]],
      document_type: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],      phone: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
      phone_optional: ['', Validators.pattern(/^9\d{8}$/)],
      studyProgramId: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5), this.forbiddenWordsValidator(this.forbiddenWords)]],
      status: ['A']
    });
  }



  ngOnInit(): void {
    this.obtenerContactFormContacto();
    this.contactFormService.getContactFormsUpdateListener().subscribe((contactForms: ContactForm[]) => {
      this.contactForms = contactForms;
    });
    this.loadStudyProgrammes();
    if (this.selectContactFormForEdit) {
      this.populateForm(this.selectContactFormForEdit);
    }
    this.contactFormfrom.get('document_type')?.valueChanges.subscribe(value => {
      this.updateDocumentNumberValidator(value);
    });
  }

  updateDocumentNumberValidator(type: string): void {
    const documentNumberControl = this.contactFormfrom.get('documentNumber');
    if (type === 'DNI') {
      documentNumberControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{8}$')]);
    } else if (type === 'CNE') {
      documentNumberControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{15}$')]);
    }
    documentNumberControl?.updateValueAndValidity();
  }

  ageValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthdate = moment(control.value, 'YYYY-MM-DD');
      const age = moment().diff(birthdate, 'years');
      if (age < minAge) {
        return { 'ageTooLow': true };
      }
      return null;
    };
  }

  forbiddenWordsValidator(forbiddenWords: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toLowerCase();
      for (let word of forbiddenWords) {
        if (value.includes(word)) {
          return { 'forbiddenWord': true };
        }
      }
      return null;
    };
  }

  obtenerContactFormContacto(): void {
    this.contactFormService.getActiveContactForms().subscribe((data: ContactForm[]) => {
      this.contactForms = data;
    });
  }

  onContactFormAdded(): void {
    this.obtenerContactFormContacto(); // Método para actualizar la lista de usuarios
  }

  previousStepOrClose(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.closeModal();
    }
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.contactFormfrom.get('name')?.valid && this.contactFormfrom.get('lastname_paternal')?.valid && this.contactFormfrom.get('lastname_maternal')?.valid && this.contactFormfrom.get('birthdate')?.valid && this.contactFormfrom.get('document_type')?.valid && this.contactFormfrom.get('documentNumber')?.valid) {
      this.currentStep++;
    } else if (this.currentStep === 2 && this.contactFormfrom.get('email')?.valid && this.contactFormfrom.get('phone')?.valid && this.contactFormfrom.get('phone_optional')?.valid && this.contactFormfrom.get('studyProgramId')?.valid && this.contactFormfrom.get('description')?.valid) {
      this.currentStep++;
    } else {
      Swal.fire('Error', 'Complete todos los campos correctamente', 'error');
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    if (this.contactFormfrom.valid) {
      // Formatear la fecha de nacimiento
      const formattedBirthdate = moment(this.contactFormfrom.get('birthdate')?.value).format('DD-MMM-YYYY');
      this.contactFormfrom.get('birthdate')?.setValue(formattedBirthdate);

      if (this.selectContactFormForEdit) {
        const id = this.selectContactFormForEdit.id;
        this.contactFormService.actualizarContactForm(id, this.contactFormfrom.value).subscribe(
          () => {
            Swal.fire('Usuario actualizado', 'El usuario ha sido actualizado con éxito', 'success');
            this.contactFormtAdd.emit(); // Emitir evento después de actualizar
            this.resetForm();
            this.closeModal();
          },
          error => {
            Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
            console.error('Error updating contactForm:', error);
          }
        );
      } else {
        this.contactFormService.crearUsuario(this.contactFormfrom.value).subscribe(
          () => {
            Swal.fire('Usuario creado', 'El usuario ha sido creado con éxito', 'success');
            this.contactFormtAdd.emit(); // Emitir evento después de crear
            this.resetForm();
            this.closeModal();
          },
          error => {
            Swal.fire('Error', 'No se pudo crear el usuario', 'error');
            console.error('Error creating contactForm:', error);
          }
        );
      }
    } else {
      Swal.fire('Error', 'Complete todos los campos correctamente', 'error');
    }
  }

  loadStudyProgrammes(): void {
    this.studyProgrammeService.getActiveStudyProgramme().subscribe(
      (data: StudyProgramme[]) => {
        this.studyProgrammes = data;
      },
      (error) => {
        console.error('Error al cargar programas de estudio', error);
      }
    );
  }

  convertToUppercase(field: string): void {
    const value = this.contactFormfrom.get(field)?.value;
    if (value) {
      this.contactFormfrom.get(field)?.setValue(value.toUpperCase(), { emitEvent: false });
    }
  }

  openModal(contactForm?: ContactForm): void {
    if (contactForm) {
      this.selectContactFormForEdit = { ...contactForm };
      this.populateForm(contactForm);
    } else {
      this.resetForm();
    }
    this.showForm = true;
  }

  closeModal() {
    this.showForm = false;
    this.resetForm();
    this.selectContactFormForEdit = null;

  }


  resetForm(): void {
    this.contactFormfrom.reset({
      id: '',
      name: '',
      lastname_paternal: '',
      lastname_maternal: '',
      birthdate: '',
      document_type: '',
      documentNumber: '',
      email: '',
      phone: '',
      phone_optional: '',
      studyProgramId: '',
      description: '',
      status: 'A'
    });
  }

  areFieldsEmpty(): boolean {
    return (
      !this.contactFormfrom.get('name')?.value ||
      !this.contactFormfrom.get('lastname_paternal')?.value ||
      !this.contactFormfrom.get('lastname_maternal')?.value ||
      !this.contactFormfrom.get('birthdate')?.value ||
      !this.contactFormfrom.get('document_type')?.value ||
      !this.contactFormfrom.get('documentNumber')?.value ||
      !this.contactFormfrom.get('email')?.value ||
      !this.contactFormfrom.get('phone')?.value ||
      !this.contactFormfrom.get('studyProgramId')?.value ||
      !this.contactFormfrom.get('description')?.value
    );
  }

  private populateForm(contactForm: ContactForm): void {
    // Formatear la fecha de nacimiento
    const formattedBirthdate = moment(contactForm.birthdate, 'YYYY-MM-DD').format('DD-MMM-YYYY');
    this.contactFormfrom.patchValue({
      id: contactForm.id,
      name: contactForm.name,
      lastname_paternal: contactForm.lastname_paternal,
      lastname_maternal: contactForm.lastname_maternal,
      birthdate: formattedBirthdate, // Asignar la fecha formateada aquí
      document_type: contactForm.document_type,
      documentNumber: contactForm.documentNumber,
      email: contactForm.email,
      phone: contactForm.phone,
      phone_optional: contactForm.phone_optional,
      studyProgramId: contactForm.studyProgramId, // Llenar campo de programa de estudio
      description: contactForm.description, // Llenar campo de descripción
      status: contactForm.status
    });
  }
}
