import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionfrComponent } from './expressionfr.component';

describe('ExpressionfrComponent', () => {
  let component: ExpressionfrComponent;
  let fixture: ComponentFixture<ExpressionfrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressionfrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpressionfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
