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
      imports: [ReactiveFormsModule, LoginComponent], // Aquí se importa el componente standalone
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a disabled submit button if the form is invalid', () => {
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.formularioLogin.controls['username'].setValue('testuser');
    component.formularioLogin.controls['contrasena'].setValue('password123');
    
    fixture.detectChanges();
    
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should display an error message for the username field when it is empty and touched', () => {
    const usernameField = component.formularioLogin.get('username');
    usernameField?.markAsTouched();
    
    fixture.detectChanges();
    
    const errorMessage = fixture.debugElement.query(By.css('div.text-danger'));
    expect(errorMessage.nativeElement.textContent).toContain('Nombre de usuario es obligatorio.');
  });

  it('should display an error message for the password field when it is empty and touched', () => {
    const passwordField = component.formularioLogin.get('contrasena');
    passwordField?.markAsTouched();
    
    fixture.detectChanges();
    
    const errorMessage = fixture.debugElement.query(By.css('div.text-danger'));
    expect(errorMessage.nativeElement.textContent).toContain('Contraseña es obligatoria.');
  });

  it('should call login() when the form is submitted with valid data', () => {
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

  it('should display an error message if login fails', () => {
    component.mensajeError = 'Credenciales incorrectas';
    fixture.detectChanges();
    
    const errorAlert = fixture.debugElement.query(By.css('.alert-danger'));
    expect(errorAlert.nativeElement.textContent).toContain('Credenciales incorrectas');
  });

});