import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscribedListItemComponent } from './transcribed-list-item.component';

describe('TranscribedListItemComponent', () => {
  let component: TranscribedListItemComponent;
  let fixture: ComponentFixture<TranscribedListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscribedListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscribedListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
