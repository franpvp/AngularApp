import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el formulario de login con campos vacíos al inicio', () => {
    const usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
    const contrasenaInput = fixture.debugElement.query(By.css('#contraseña1')).nativeElement;

    expect(usernameInput.value).toBe('');
    expect(contrasenaInput.value).toBe('');
  });

  it('debería marcar el formulario como inválido si los campos están vacíos', () => {
    component.username = '';
    component.contrasena = '';
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formElement.checkValidity()).toBeFalse();
  });

  it('debería llamar al método `login()` al enviar el formulario', () => {
    spyOn(component, 'login');

    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);

    expect(component.login).toHaveBeenCalled();
  });

  it('debería mostrar un mensaje de error si el inicio de sesión falla', () => {
    component.mensajeError = 'Credenciales incorrectas';
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css('.alert-danger')).nativeElement;
    expect(alertElement.textContent).toContain('Credenciales incorrectas');
  });

});
