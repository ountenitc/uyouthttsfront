import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionmrComponent } from './expressionmr.component';

describe('ExpressionmrComponent', () => {
  let component: ExpressionmrComponent;
  let fixture: ComponentFixture<ExpressionmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressionmrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpressionmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
