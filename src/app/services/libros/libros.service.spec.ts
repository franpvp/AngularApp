import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { LibrosService } from './libros.service';

describe('LibrosService', () => {
  let service: LibrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LibrosService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});