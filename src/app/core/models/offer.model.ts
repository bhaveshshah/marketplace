export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  merchantName: string;
  merchantId: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface UserVote {
  userId: number;
  offerId: number;
  voteType: 'up' | 'down';
}
