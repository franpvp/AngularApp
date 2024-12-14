import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importa HttpClientTestingModule

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]  // Asegúrate de incluir este módulo
    });
    service = TestBed.inject(AuthService);  // Injecta el servicio AuthService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Comprueba que el servicio se crea correctamente
  });
});