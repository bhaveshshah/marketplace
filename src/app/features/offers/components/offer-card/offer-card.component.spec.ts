import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCardComponent } from './offer-card.component';
import { provideRouter } from '@angular/router';
import { Offer } from '../../../../core/models/offer.model';

describe('OfferCardComponent', () => {
  let component: OfferCardComponent;
  let fixture: ComponentFixture<OfferCardComponent>;

  const mockOffer: Offer = {
    id: 1,
    title: 'Test Offer',
    description: 'Test description',
    price: 99.99,
    image: 'https://example.com/image.jpg',
    category: 'Electronics',
    rating: {
      rate: 4.5,
      count: 100,
    },
    merchantName: 'Test Merchant',
    merchantId: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('offer', mockOffer);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
