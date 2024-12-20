import { RequestInterceptoPipe } from './request-intercepto.pipe';

describe('RequestInterceptoPipe', () => {
  it('create an instance', () => {
    const pipe = new RequestInterceptoPipe();
    expect(pipe).toBeTruthy();
  });
});
