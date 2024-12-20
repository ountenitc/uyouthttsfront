import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionmrFormComponent } from './expressionmr-form.component';

describe('ExpressionmrFormComponent', () => {
  let component: ExpressionmrFormComponent;
  let fixture: ComponentFixture<ExpressionmrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressionmrFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpressionmrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
