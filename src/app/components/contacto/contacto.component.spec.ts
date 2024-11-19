import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactoComponent } from './contacto.component';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoComponent, ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia inicializar el formulario con los campos vacios', () => {
    expect(component.formularioContacto.get('nombre')?.value).toBe('');
    expect(component.formularioContacto.get('correo')?.value).toBe('');
    expect(component.formularioContacto.get('asunto')?.value).toBe('');
    expect(component.formularioContacto.get('mensaje')?.value).toBe('');
  });

  it('deberia mostrar el formulario como inválidos si los campos son obligatorios', () => {
    component.formularioContacto.setValue({
      nombre: '',
      correo: '',
      asunto: '',
      mensaje: ''
    });
    expect(component.formularioContacto.invalid).toBeTrue();
  });

  it('deberia validar que el campo correo acepte solamente un correo válido', () => {
    const correoControl = component.formularioContacto.get('correo');
    correoControl?.setValue('invalid-email');
    expect(correoControl?.valid).toBeFalse();

    correoControl?.setValue('valid@example.com');
    expect(correoControl?.valid).toBeTrue();
  });

  it('deberia validar que el campo nombre es requerido', () => {
    const nombreControl = component.formularioContacto.get('nombre');
    nombreControl?.setValue('');
    expect(nombreControl?.valid).toBeFalse();

    nombreControl?.setValue('Juan');
    expect(nombreControl?.valid).toBeTrue();
  });

  it('deberia validar que el campo asunto es requerido', () => {
    const asuntoControl = component.formularioContacto.get('asunto');
    asuntoControl?.setValue('');
    expect(asuntoControl?.valid).toBeFalse();

    asuntoControl?.setValue('Consulta');
    expect(asuntoControl?.valid).toBeTrue();
  });

  it('deberia validar que el campo mensaje es requerido', () => {
    const mensajeControl = component.formularioContacto.get('mensaje');
    mensajeControl?.setValue('');
    expect(mensajeControl?.valid).toBeFalse();

    mensajeControl?.setValue('Este es un mensaje de prueba.');
    expect(mensajeControl?.valid).toBeTrue();
  });

  it('deberia enviar el formulario si todos los campos son válidos', () => {
    component.formularioContacto.setValue({
      nombre: 'Juan',
      correo: 'juan@example.com',
      asunto: 'Consulta',
      mensaje: 'Este es un mensaje de prueba.'
    });

    spyOn(component, 'submitForm');
    fixture.detectChanges();

    let formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));

    expect(component.submitForm).toHaveBeenCalled();
  });
});
