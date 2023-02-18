import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordLineComponent } from './record-line.component';

describe('RecordLineComponent', () => {
  let component: RecordLineComponent;
  let fixture: ComponentFixture<RecordLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
