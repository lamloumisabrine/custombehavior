import { TestBed } from '@angular/core/testing';
import { PolicyUtilsService } from './policy-utils.service';


describe('PolicyUtilsService', () => {
  let service: PolicyUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
