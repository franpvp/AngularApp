import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia inicializar el formulario con campos vacios', () => {
    expect(component.formularioRegistro.get('nombres')?.value).toBe('');
    expect(component.formularioRegistro.get('apellidos')?.value).toBe('');
    expect(component.formularioRegistro.get('username')?.value).toBe('');
    expect(component.formularioRegistro.get('correo')?.value).toBe('');
    expect(component.formularioRegistro.get('fecha_nacimiento')?.value).toBe('');
    expect(component.formularioRegistro.get('domicilio')?.value).toBe('');
    expect(component.formularioRegistro.get('contrasena1')?.value).toBe('');
    expect(component.formularioRegistro.get('contrasena2')?.value).toBe('');
  });

  it('deberia marcar en el formulario como inválidos los campos que estan vacios', () => {
    component.formularioRegistro.setValue({
      nombres: '',
      apellidos: '',
      username: '',
      correo: '',
      fecha_nacimiento: '',
      domicilio: '',
      contrasena1: '',
      contrasena2: ''
    });
    expect(component.formularioRegistro.invalid).toBeTrue();
  });

  it('deberia validar que el campo correo acepte valores compatibles a un email', () => {
    let correoControl = component.formularioRegistro.get('correo');
    correoControl?.setValue('invalid-email');
    expect(correoControl?.valid).toBeFalse();

    correoControl?.setValue('valid@example.com');
    expect(correoControl?.valid).toBeTrue();
  });

  it('debería verificar que las contraseñas coincidan', () => {
    component.formularioRegistro.get('contrasena1')?.setValue('contrasena123');
    component.formularioRegistro.get('contrasena2')?.setValue('contrasena123');
    expect(component.formularioRegistro.errors).toBeNull();
    
    component.formularioRegistro.get('contrasena2')?.setValue('otraContrasena');
    expect(component.formularioRegistro.errors).toEqual({ contrasenasNoCoinciden: true });
  });

  it('deberia enviar el formulario si todos los campos son válidos', () => {
    component.formularioRegistro.setValue({
      nombres: 'Juan',
      apellidos: 'Pérez',
      username: 'juanperez',
      correo: 'juan@example.com',
      fecha_nacimiento: '1990-01-01',
      domicilio: '',
      contrasena1: 'Password123',
      contrasena2: 'Password123'
    });

    spyOn(component, 'submitForm');
    fixture.detectChanges();

    let formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));

    expect(component.submitForm).toHaveBeenCalled();
  });

});
