import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriedocComponent } from './categoriedoc.component';

describe('CategoriedocComponent', () => {
  let component: CategoriedocComponent;
  let fixture: ComponentFixture<CategoriedocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriedocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriedocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
