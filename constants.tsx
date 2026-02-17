
import React from 'react';
import { TicketData } from './types';

export const MOCK_TICKETS: TicketData[] = [
  {
    id: 'T001',
    name: '2000萬超級紅包',
    price: 2000,
    totalTickets: 1000000,
    remainingTickets: 450000,
    topPrize: '2000萬',
    expectedReturn: 0.74,
    lastUpdated: '2024-03-20'
  },
  {
    id: 'T002',
    name: '麻將',
    price: 200,
    totalTickets: 5000000,
    remainingTickets: 1200000,
    topPrize: '200萬',
    expectedReturn: 0.65,
    lastUpdated: '2024-03-18'
  },
  {
    id: 'T003',
    name: '大吉利',
    price: 500,
    totalTickets: 2000000,
    remainingTickets: 850000,
    topPrize: '500萬',
    expectedReturn: 0.68,
    lastUpdated: '2024-03-19'
  }
];

export const ICONS = {
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Zap: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Layout: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Compass: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
};
