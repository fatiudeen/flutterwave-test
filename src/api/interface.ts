export interface RequsetInterface {
  ID: number;
  Amount: number;
  Currency: string;
  CustomerEmail: string;
  SplitInfo: {
    SplitType: 'FLAT' | 'PERCENTAGE' | 'RATIO';
    SplitValue: number;
    SplitEntityId: string;
  }[];
  [key: string]: any;
}

export interface ResponseInterface {
  ID: number;
  Balance: number;
  SplitBreakdown: {
    Amount: number;
    SplitEntityId: string;
  }[];
  [key: string]: any;
}
