import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriedocFormComponent } from './categoriedoc-form.component';

describe('CategoriedocFormComponent', () => {
  let component: CategoriedocFormComponent;
  let fixture: ComponentFixture<CategoriedocFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriedocFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriedocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
