import { TestBed, inject } from '@angular/core/testing';

import { EQService } from './eq.service';

describe('EQService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EQService]
    });
  });

  it('should be created', inject([EQService], (service: EQService) => {
    expect(service).toBeTruthy();
  }));
});
