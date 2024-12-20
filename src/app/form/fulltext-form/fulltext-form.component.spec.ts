import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulltextFormComponent } from './fulltext-form.component';

describe('FulltextFormComponent', () => {
  let component: FulltextFormComponent;
  let fixture: ComponentFixture<FulltextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FulltextFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FulltextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
