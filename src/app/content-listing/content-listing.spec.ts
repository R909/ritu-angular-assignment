import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListing } from './content-listing';

describe('ContentListing', () => {
  let component: ContentListing;
  let fixture: ComponentFixture<ContentListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
