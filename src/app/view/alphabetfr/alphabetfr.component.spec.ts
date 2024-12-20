import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetfrComponent } from './alphabetfr.component';

describe('AlphabetfrComponent', () => {
  let component: AlphabetfrComponent;
  let fixture: ComponentFixture<AlphabetfrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphabetfrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlphabetfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
