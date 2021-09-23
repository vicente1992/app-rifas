import { TestBed } from '@angular/core/testing';

import { CheckReferredInterceptor } from './check-referred.interceptor';

describe('CheckReferredInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CheckReferredInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CheckReferredInterceptor = TestBed.inject(CheckReferredInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
