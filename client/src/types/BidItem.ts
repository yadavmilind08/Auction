export interface IBidItem extends Record<string, unknown> {
  id: string;
  amount: number;
  IsStraightBid: boolean;
  auctionItemId: number;
  UserId: string;
}
