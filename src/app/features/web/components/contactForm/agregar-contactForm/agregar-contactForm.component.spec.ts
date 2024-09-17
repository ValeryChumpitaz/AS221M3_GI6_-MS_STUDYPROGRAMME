import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarContactFormComponent } from './agregar-contactForm.component';



describe('AgregarContactFormComponent', () => {
  let component: AgregarContactFormComponent;
  let fixture: ComponentFixture<AgregarContactFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarContactFormComponent]
    });
    fixture = TestBed.createComponent(AgregarContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
