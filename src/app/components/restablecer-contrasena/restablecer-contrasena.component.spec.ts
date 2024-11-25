import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RestablecerContrasenaComponent } from './restablecer-contrasena.component';

describe('RestablecerContrasenaComponent', () => {
  let component: RestablecerContrasenaComponent;
  let fixture: ComponentFixture<RestablecerContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestablecerContrasenaComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestablecerContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
