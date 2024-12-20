import { TestBed } from '@angular/core/testing';

import { AlertetextService } from './alertetext.service';

describe('AlertetextService', () => {
  let service: AlertetextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertetextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
