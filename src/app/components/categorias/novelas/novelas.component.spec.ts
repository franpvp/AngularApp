import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelasComponent } from './novelas.component';

describe('NovelasComponent', () => {
  let component: NovelasComponent;
  let fixture: ComponentFixture<NovelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovelasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
