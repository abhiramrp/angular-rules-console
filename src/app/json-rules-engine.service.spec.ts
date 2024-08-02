import { TestBed } from '@angular/core/testing';

import { JsonRulesEngineService } from './json-rules-engine.service';

describe('JsonRulesEngineService', () => {
  let service: JsonRulesEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonRulesEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
