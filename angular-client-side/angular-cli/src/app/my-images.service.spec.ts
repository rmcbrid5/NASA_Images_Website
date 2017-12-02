import { TestBed, inject } from '@angular/core/testing';

import { MyImagesService } from './my-images.service';

describe('MyImagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyImagesService]
    });
  });

  it('should be created', inject([MyImagesService], (service: MyImagesService) => {
    expect(service).toBeTruthy();
  }));
});
