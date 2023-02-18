import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityInputComponent } from './visibility-input.component';

describe('VisibilityInputComponent', () => {
  let component: VisibilityInputComponent;
  let fixture: ComponentFixture<VisibilityInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilityInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
