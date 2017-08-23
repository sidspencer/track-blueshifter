import { TestBed, inject } from '@angular/core/testing';

import { ShifterService } from './shifter.service';

describe('ShifterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShifterService]
    });
  });

  it('should be created', inject([ShifterService], (service: ShifterService) => {
    expect(service).toBeTruthy();
  }));
});
