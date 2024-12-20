import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctextComponent } from './doctext.component';


describe('DoctextComponent', () => {
  let component: DoctextComponent;
  let fixture: ComponentFixture<DoctextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
