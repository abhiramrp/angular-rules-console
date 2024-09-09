import { TestBed } from '@angular/core/testing';

import { AISApiService } from './aisapi.service';

describe('AISApiService', () => {
  let service: AISApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AISApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
