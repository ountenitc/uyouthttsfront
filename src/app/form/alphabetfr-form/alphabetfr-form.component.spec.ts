import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetfrFormComponent } from './alphabetfr-form.component';

describe('AlphabetfrFormComponent', () => {
  let component: AlphabetfrFormComponent;
  let fixture: ComponentFixture<AlphabetfrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphabetfrFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlphabetfrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
