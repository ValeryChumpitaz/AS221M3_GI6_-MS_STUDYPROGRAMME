import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactFormService } from '../services/contactForm.service';
import { Router } from '@angular/router';
import { ContactForm } from '../interfaces/contactForm';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { AgregarContactFormComponent } from './agregar-contactForm/agregar-contactForm.component';
import { StudyProgramme } from './../interfaces/study-programme';
import { StudyProgrammeService } from '../services/study-programme.service';

@Component({
  selector: 'app-contactForm',
  templateUrl: './contactForm.component.html',
  styleUrls: ['./contactForm.component.css']
})
export class ContactFormComponent implements OnInit {
  @ViewChild(AgregarContactFormComponent) contactFormFormComponent!: AgregarContactFormComponent;
  contactForms: ContactForm[] = [];
  filteredContactForms: ContactForm[] = [];
  filtro: string = '';
  searDocumentType: string = '';
  searchQuery: string = '';
  Active: boolean = true;
  Actions: boolean = true;
  currentPage = 1;
  itemsPerPage = 10;
  studyPrograms: { id: string, name: string }[] = []; // Array para almacenar los programas de estudio
  studyProgramFilter: string = ''; // Filtro para los programas de estudio
  studyProgramMap: { [key: string]: string } = {};
  studyProgrammes: StudyProgramme[] = [];
  showExportOptions: boolean = false;

  constructor(private contactFormService: ContactFormService, private studyProgrammeService: StudyProgrammeService, private router: Router) { }

  ngOnInit(): void {
    this.filtro = '';
    this.obtenerContactFormContacto();
    this.getStudyPrograms();
    this.contactFormService.getContactFormsUpdateListener().subscribe((contactForms: ContactForm[]) => {
      this.contactForms = contactForms;
    });
    

    this.contactFormService.getContactFormsUpdateListener().subscribe((updatedContactForms: ContactForm[]) => {
      this.contactForms = this.contactForms.map(contactForm => {
        const updatedContactForm = updatedContactForms.find(u => u.id === contactForm.id);
        return updatedContactForm ? updatedContactForm : contactForm;
      });
      this.filteredContactForms = this.contactForms;
    });
    this.studyProgrammeService.getActiveStudyProgramme().subscribe(data => {
      this.studyProgrammes = data;
    }, error => console.log(error));
  }

  onContactFormAdded(): void {
    this.obtenerContactFormContacto(); // Método para actualizar la lista de usuarios
  }

  getStudyPrograms() {
    this.studyProgrammeService.getActiveStudyProgramme().subscribe((data: StudyProgramme[]) => {
      this.studyPrograms = data.map(program => ({ id: program.id, name: program.name }));
      this.studyProgramMap = this.studyPrograms.reduce((map: { [key: string]: string }, program) => {
        map[program.id] = program.name; 
        return map;
      }, {});
    });
  }


  obteneActivos() {
    this.contactFormService.getActiveContactForms().pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        Swal.fire('Error', 'No se pudieron obtener los datos de los usuarios', 'error');
        return of([]);
      })
    ).subscribe((data: ContactForm[]) => {
      this.contactForms = data;
      this.filteredContactForms = data;
      this.Actions = true; // Mostrar acciones de edición y eliminación
    });
  }

  obteneInactivos() {
    this.contactFormService.getInactivos().pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        Swal.fire('Error', 'No se pudieron obtener los datos de los usuarios', 'error');
        return of([]);
      })
    ).subscribe((data: ContactForm[]) => {
      this.contactForms = data;
      this.filteredContactForms = data;
      this.Actions = false; // Mostrar acción de activación
    });
  }

  obtenerContactFormContacto() {
    if (this.Active) {
      this.obteneActivos();
    } else {
      this.obteneInactivos();
    }
  }

  ActividadEstado() {
    this.Active = !this.Active;
    this.obtenerContactFormContacto();
  }

  onSearch() {
    if (this.Active) {
      this.contactFormService.getActiveContactForms().subscribe(data => {
        this.contactForms = this.filterContactForm(data);
      });
    } else {
      this.contactFormService.getInactivos().subscribe(data => {
        this.contactForms = this.filterContactForm(data);
      });
    }
  }

  filterContactForm(contactFormss: ContactForm[]): ContactForm[] {
    return contactFormss.filter(uss =>
      (this.searDocumentType === '' || uss.document_type.toLowerCase() === this.searDocumentType.toLowerCase()) &&
      (uss.documentNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        `${uss.lastname_paternal} ${uss.lastname_maternal} ${uss.name} ${uss.documentNumber} ${uss.email} ${uss.birthdate}`.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }
  

  deleteContactForm(contactForm: ContactForm): void {
    Swal.fire({
      title: 'Confirmar eliminación',
      text: `¿Estás seguro de que deseas eliminar a ${contactForm.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactFormService.eliminarContactForm(contactForm.id).subscribe(() => {
          this.obtenerContactFormContacto(); // Refresca la lista de usuarios
          Swal.fire('Usuario eliminado', 'El usuario ha sido eliminado con éxito', 'success');
        });
      }
    });
  }

  deletePermanently(contactForm: ContactForm): void {
    Swal.fire({
      title: 'Confirmar eliminación permanente',
      text: `¿Estás seguro de que deseas eliminar permanentemente a ${contactForm.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactFormService.deletePermanently(contactForm.id).subscribe(() => {
          this.obteneInactivos(); // Refresca la lista de formularios inactivos
          Swal.fire('Contacto eliminado', 'El contacto ha sido eliminado permanentemente', 'success');
        }, error => {
          console.error('Error al eliminar permanentemente:', error);
          Swal.fire('Contacto eliminado', 'El contacto ha sido eliminado permanentemente', 'success');
          this.obtenerContactFormContacto();
        });
      }
    });
  }
  
  
  

  activeContactForm(contactForm: ContactForm): void {
    Swal.fire({
      title: 'Confirmar activación',
      text: `¿Estás seguro de que deseas activar a ${contactForm.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactFormService.activarContactForm(contactForm.id).subscribe(() => {
          this.obtenerContactFormContacto(); // Refresca la lista de usuarios
          Swal.fire('Usuario activado', 'El usuario ha sido activado con éxito', 'success');
        });
      }
    });
  }

  openModal(contactFormss?: ContactForm) {
    this.contactFormFormComponent.openModal(contactFormss);
  }

  editStudent(contactForm: ContactForm): void {
    this.contactFormFormComponent.openModal(contactForm);
  }

  exportToCSV() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredContactForms);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ContactForms');
    XLSX.writeFile(wb, 'ContactForms.csv');
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredContactForms);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ContactForms');
    XLSX.writeFile(wb, 'ContactForms.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    const col = ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Tipo de Documento', 'Número de Documento', 'Correo Electrónico', 'Celular', 'Celular Opcional'];
    const rows = this.filteredContactForms.map(contactForm => [
      contactForm.name,
      contactForm.lastname_paternal,
      contactForm.lastname_maternal,
      contactForm.document_type,
      contactForm.documentNumber,
      contactForm.email,
      contactForm.phone,
      contactForm.phone_optional,
    ]);

    (doc as any).autoTable({
      head: [col],
      body: rows
    });

    doc.save('ContactForms.pdf');
  }

  // Method to toggle export options
  toggleExportOptions() {
    this.showExportOptions = !this.showExportOptions;
  }
}
