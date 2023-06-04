import { TestBed } from '@angular/core/testing';

import { HasFamilyGuard } from './has-family.guard';

describe('HasFamilyGuard', () => {
  let guard: HasFamilyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasFamilyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
