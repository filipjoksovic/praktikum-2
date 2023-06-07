import { TestBed } from '@angular/core/testing';

import { FamilyStoreService } from './family-store.service';

describe('FamilyService', () => {
  let service: FamilyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
