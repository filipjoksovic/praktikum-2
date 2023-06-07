import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDescriptorPillComponent } from './page-descriptor-pill.component';

describe('PageDescriptorPillComponent', () => {
  let component: PageDescriptorPillComponent;
  let fixture: ComponentFixture<PageDescriptorPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDescriptorPillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDescriptorPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
