import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctextFormComponent } from './doctext-form.component';

describe('DoctextFormComponent', () => {
  let component: DoctextFormComponent;
  let fixture: ComponentFixture<DoctextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctextFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
