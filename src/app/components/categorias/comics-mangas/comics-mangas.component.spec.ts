import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsMangasComponent } from './comics-mangas.component';

describe('ComicsMangasComponent', () => {
  let component: ComicsMangasComponent;
  let fixture: ComponentFixture<ComicsMangasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicsMangasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComicsMangasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
