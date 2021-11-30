import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureBrowserComponent } from './picture-browser.component';

describe('PictureBrowserComponent', () => {
  let component: PictureBrowserComponent;
  let fixture: ComponentFixture<PictureBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
