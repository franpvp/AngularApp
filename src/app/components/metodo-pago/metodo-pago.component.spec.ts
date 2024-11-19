import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoPagoComponent } from './metodo-pago.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MetodoPagoComponent', () => {
  let component: MetodoPagoComponent;
  let fixture: ComponentFixture<MetodoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodoPagoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => '123' })
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetodoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
