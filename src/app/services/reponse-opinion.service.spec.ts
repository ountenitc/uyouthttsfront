import { TestBed } from '@angular/core/testing';

import { ReponseOpinionService } from './reponse-opinion.service';

describe('ReponseOpinionService', () => {
  let service: ReponseOpinionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReponseOpinionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
