import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertetextComponent } from './alertetext.component';

describe('AlertetextComponent', () => {
  let component: AlertetextComponent;
  let fixture: ComponentFixture<AlertetextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertetextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertetextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
