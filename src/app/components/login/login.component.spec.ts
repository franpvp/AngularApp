import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitButton: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener un botón de envío deshabilitado si el formulario no es válido', () => {
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('debe habilitar el botón enviar cuando el formulario sea válido', () => {
    component.formularioLogin.controls['username'].setValue('testuser');
    component.formularioLogin.controls['contrasena'].setValue('password123');
    
    fixture.detectChanges();
    
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('debería mostrar un mensaje de error para el campo de nombre de usuario cuando está vacío y es seleccionado', () => {
    const usernameField = component.formularioLogin.get('username');
    usernameField?.markAsTouched();
    
    fixture.detectChanges();
    
    const errorMessage = fixture.debugElement.query(By.css('div.text-danger'));
    expect(errorMessage.nativeElement.textContent).toContain('Nombre de usuario es obligatorio.');
  });

  it('debería mostrar un mensaje de error para el campo de contraseña cuando está vacío y es seleccionado', () => {
    const passwordField = component.formularioLogin.get('contrasena');
    passwordField?.markAsTouched();
    
    fixture.detectChanges();
    
    const errorMessage = fixture.debugElement.query(By.css('div.text-danger'));
    expect(errorMessage.nativeElement.textContent).toContain('Contraseña es obligatoria.');
  });

  it('debe llamar a login() cuando el formulario se envía con datos válidos', () => {
    // Espiar el método login
    spyOn(component, 'login');

    // Establecer datos válidos en el formulario
    component.formularioLogin.controls['username'].setValue('testuser');
    component.formularioLogin.controls['contrasena'].setValue('password123');
    
    // Obtener el formulario y simular el envío
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    // Verificar que el método login() fue llamado
    expect(component.login).toHaveBeenCalled();
  });

  it('debería mostrar un mensaje de error si falla el inicio de sesión', () => {
    component.mensajeError = 'Credenciales incorrectas';
    fixture.detectChanges();
    
    const errorAlert = fixture.debugElement.query(By.css('.alert-danger'));
    expect(errorAlert.nativeElement.textContent).toContain('Credenciales incorrectas');
  });

});