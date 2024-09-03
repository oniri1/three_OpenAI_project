export interface IMsgs {
  ai?: string;
  user?: string;
}

export interface IFeedBackMsgs extends IMsgs {
  feedBack?: string;
}

export interface ITotalValue {
  feedBackId: number;
  totalFeedBack: string;
}
