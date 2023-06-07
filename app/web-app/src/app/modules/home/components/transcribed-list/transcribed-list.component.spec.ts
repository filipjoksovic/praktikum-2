import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscribedListComponent } from './transcribed-list.component';

describe('TranscribedListComponent', () => {
  let component: TranscribedListComponent;
  let fixture: ComponentFixture<TranscribedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscribedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscribedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
