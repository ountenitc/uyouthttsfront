import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulltextComponent } from './fulltext.component';

describe('FulltextComponent', () => {
  let component: FulltextComponent;
  let fixture: ComponentFixture<FulltextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FulltextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FulltextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
