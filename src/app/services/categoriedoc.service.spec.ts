import { TestBed } from '@angular/core/testing';

import { CategoriedocService } from './categoriedoc.service';

describe('CategoriedocService', () => {
  let service: CategoriedocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriedocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
