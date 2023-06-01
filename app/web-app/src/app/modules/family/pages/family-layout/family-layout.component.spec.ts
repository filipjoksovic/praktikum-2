import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyLayoutComponent } from './family-layout.component';

describe('FamilyComponent', () => {
  let component: FamilyLayoutComponent;
  let fixture: ComponentFixture<FamilyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
