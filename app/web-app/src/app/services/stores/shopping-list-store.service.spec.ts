import { TestBed } from '@angular/core/testing';

import { ShoppingListStoreService } from './shopping-list-store.service';

describe('ShoppingListStoreService', () => {
  let service: ShoppingListStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
