export interface IBidItem extends Record<string, unknown> {
  image: string;
  title: string;
  minimumBid: number;
  currentBid: number;
  timeLeft: string;
}
