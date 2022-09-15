import { TestBed } from '@angular/core/testing';

import { CustomBehaviorService } from './custom-behavior.service';

describe('CustomBehaviorService', () => {
  let service: CustomBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
