import { TestBed } from '@angular/core/testing';

import { ExpressionmrService } from './expressionmr.service';

describe('ExpressionmrService', () => {
  let service: ExpressionmrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressionmrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
