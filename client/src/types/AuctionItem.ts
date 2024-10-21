import { IBidItem } from "./BidItem";

export interface IAuctionItem extends Record<string, unknown> {
  id: string;
  title: string;
  description: string;
  minimumBid: number;
  currentBid: number;
  endDate: string;
  userId: number;
  bids: IBidItem[];
}
