import { TestBed } from '@angular/core/testing';

import { Convertirb64Service } from './convertirb64.service';

describe('Convertirb64Service', () => {
  let service: Convertirb64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Convertirb64Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
