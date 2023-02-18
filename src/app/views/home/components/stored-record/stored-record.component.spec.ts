import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredRecordComponent } from './stored-record.component';

describe('StoredRecordComponent', () => {
  let component: StoredRecordComponent;
  let fixture: ComponentFixture<StoredRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoredRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoredRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
