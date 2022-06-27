import { TestBed } from '@angular/core/testing';

import { RulesetUtilsService } from './ruleset-utils.service';

describe('RulesetUtilsService', () => {
  let service: RulesetUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesetUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
