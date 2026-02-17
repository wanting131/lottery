
export interface TicketData {
  id: string;
  name: string;
  price: number;
  totalTickets: number;
  remainingTickets: number;
  topPrize: string;
  expectedReturn: number;
  lastUpdated: string;
}

export interface AnalysisResult {
  probability: number;
  luckScore: number;
  predictedAmount: string; // 新增：預測中獎金額
  advice: string;
  mysticReading: string;
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  ANALYZE = 'ANALYZE',
  HISTORY = 'HISTORY'
}
