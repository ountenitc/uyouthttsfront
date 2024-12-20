import { TestBed } from '@angular/core/testing';

import { DoctextService } from './doctext.service';

describe('DoctextService', () => {
  let service: DoctextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
