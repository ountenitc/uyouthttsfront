import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangueFormComponent } from './langue-form.component';

describe('LangueFormComponent', () => {
  let component: LangueFormComponent;
  let fixture: ComponentFixture<LangueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangueFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LangueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
