import { TestBed } from '@angular/core/testing';

import { FulltextService } from './fulltext.service';

describe('FulltextService', () => {
  let service: FulltextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FulltextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
