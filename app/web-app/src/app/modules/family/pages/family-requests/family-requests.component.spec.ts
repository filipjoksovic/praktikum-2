import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRequestsComponent } from './family-requests.component';

describe('FamilyRequestsComponent', () => {
  let component: FamilyRequestsComponent;
  let fixture: ComponentFixture<FamilyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
