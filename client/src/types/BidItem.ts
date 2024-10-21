export interface IBidItem extends Record<string, unknown> {
  id: string;
  amount: number;
  isStraightBid: boolean;
  auctionItemId: number;
  userId: string;
}
