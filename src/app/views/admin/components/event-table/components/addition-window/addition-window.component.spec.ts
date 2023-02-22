import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionWindowComponent } from './addition-window.component';

describe('AdditionWindowComponent', () => {
  let component: AdditionWindowComponent;
  let fixture: ComponentFixture<AdditionWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
