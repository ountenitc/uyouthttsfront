import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertetextFormComponent } from './alertetext-form.component';

describe('AlertetextFormComponent', () => {
  let component: AlertetextFormComponent;
  let fixture: ComponentFixture<AlertetextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertetextFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertetextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
