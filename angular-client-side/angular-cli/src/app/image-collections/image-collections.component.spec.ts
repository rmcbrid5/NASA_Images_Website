import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCollectionsComponent } from './image-collections.component';

describe('ImageCollectionsComponent', () => {
  let component: ImageCollectionsComponent;
  let fixture: ComponentFixture<ImageCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
