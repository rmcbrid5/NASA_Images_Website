import { TestBed, inject } from '@angular/core/testing';

import { MycollectionsService } from './mycollections.service';

describe('MycollectionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MycollectionsService]
    });
  });

  it('should be created', inject([MycollectionsService], (service: MycollectionsService) => {
    expect(service).toBeTruthy();
  }));
});
