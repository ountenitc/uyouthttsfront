import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseOpinionsComponent } from './reponse-opinions.component';

describe('ReponseOpinionsComponent', () => {
  let component: ReponseOpinionsComponent;
  let fixture: ComponentFixture<ReponseOpinionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReponseOpinionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReponseOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
