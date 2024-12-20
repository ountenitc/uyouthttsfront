import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionfrFormComponent } from './expressionfr-form.component';

describe('ExpressionfrFormComponent', () => {
  let component: ExpressionfrFormComponent;
  let fixture: ComponentFixture<ExpressionfrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressionfrFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpressionfrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
