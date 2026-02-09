import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferListComponent } from './offer-list.component';
import { provideRouter } from '@angular/router';

describe('OfferListComponent', () => {
  let component: OfferListComponent;
  let fixture: ComponentFixture<OfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
