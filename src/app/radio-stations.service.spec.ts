import { TestBed } from '@angular/core/testing';

import { RadioStationsService } from './radio-stations.service';

describe('RadioStationsService', () => {
  let service: RadioStationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadioStationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
