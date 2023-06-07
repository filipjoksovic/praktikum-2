import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyListItemComponent } from './family-list-item.component';

describe('FamilyListItemComponent', () => {
  let component: FamilyListItemComponent;
  let fixture: ComponentFixture<FamilyListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
