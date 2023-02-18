import { TestBed } from '@angular/core/testing';

import { OngoingEventService } from './ongoing-event.service';

describe('OngoingEventService', () => {
  let service: OngoingEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OngoingEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
