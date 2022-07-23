export interface VoucherInterface {
  _id: string;
  name: string;
  correspondingRank: string;
  available: boolean;
  pointsCost: number;
  percentageDiscount: number;
  maxAmount: number;
}

export type VoucherPostData = Omit<VoucherInterface, '_id'>;