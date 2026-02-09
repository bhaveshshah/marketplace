import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailsComponent } from './offer-details.component';
import { OfferListComponent } from '../offer-list/offer-list.component';
import { provideRouter } from '@angular/router';

describe('OfferDetailsComponent', () => {
  let component: OfferDetailsComponent;
  let fixture: ComponentFixture<OfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferDetailsComponent],
      providers: [provideRouter([{ path: 'offers', component: OfferListComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
