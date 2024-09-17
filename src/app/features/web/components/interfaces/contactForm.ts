export class ContactForm {
    id: string;
    name: string;
    lastname_maternal: string;
    lastname_paternal: string;
    birthdate: string;
    document_type: string;
    documentNumber: string;
    email: string;
    phone: string;
    phone_optional: string;
    studyProgramId: string;
    description: string;
    status = "A";

    constructor() {
        this.id = '';
        this.name = '';
        this.lastname_maternal = '';
        this.lastname_paternal = '';
        this.birthdate = '';
        this.document_type = '';
        this.documentNumber = '';
        this.email = '';
        this.phone = '';
        this.phone_optional = '';
        this.studyProgramId = '';
        this.description = '';
        this.status = 'A';
    }
}
