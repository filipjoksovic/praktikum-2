import { TestBed } from '@angular/core/testing';

import { ImageCacheServiceService } from './image-cache-service.service';

describe('ImageCacheServiceService', () => {
  let service: ImageCacheServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCacheServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
