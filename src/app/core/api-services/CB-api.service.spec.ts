import { TestBed } from '@angular/core/testing';

import { CBApiService } from './CB-api.service';

describe('CBApiService', () => {
  let service: CBApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CBApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
