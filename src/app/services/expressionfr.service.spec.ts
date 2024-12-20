import { TestBed } from '@angular/core/testing';

import { ExpressionfrService } from './expressionfr.service';

describe('ExpressionfrService', () => {
  let service: ExpressionfrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressionfrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
