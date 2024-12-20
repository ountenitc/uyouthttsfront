import { TestBed } from '@angular/core/testing';

import { AlphabetfrService } from './alphabetfr.service';

describe('AlphabetfrService', () => {
  let service: AlphabetfrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlphabetfrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
