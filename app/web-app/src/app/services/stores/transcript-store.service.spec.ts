import { TestBed } from '@angular/core/testing';

import { TranscriptStoreService } from './transcript-store.service';

describe('TranscriptStoreService', () => {
  let service: TranscriptStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscriptStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
