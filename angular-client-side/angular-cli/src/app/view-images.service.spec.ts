import { TestBed, inject } from '@angular/core/testing';

import { ViewImagesService } from './view-images.service';

describe('ViewImagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewImagesService]
    });
  });

  it('should be created', inject([ViewImagesService], (service: ViewImagesService) => {
    expect(service).toBeTruthy();
  }));
});
