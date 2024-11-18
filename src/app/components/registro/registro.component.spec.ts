import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, ReactiveFormsModule],
      declarations: [RegistroComponent]
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
      contrasena1: '',
      contrasena2: ''
    });
    expect(component.formularioRegistro.invalid).toBeTrue();
  });




});
