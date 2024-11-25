import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleCarroComponent } from './detalle-carro.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('DetalleCarroComponent', () => {
  let component: DetalleCarroComponent;
  let fixture: ComponentFixture<DetalleCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCarroComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
