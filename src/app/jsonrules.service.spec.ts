import { TestBed } from '@angular/core/testing';

import { JSONRulesService } from './jsonrules.service';

describe('JSONRulesService', () => {
  let service: JSONRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JSONRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
