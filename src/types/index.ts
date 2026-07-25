export type Metal = 'gold' | 'silver';
export type Purity = 'gold22' | 'gold18' | 'silver90' | 'silver925';

export interface Rates { gold22: number; gold18: number; silver90: number; silver925: number; updatedAt: string; }
export interface CalculationInput { metal: Metal; purity: Purity; weight: number; makingPercent: number; makingChargeType: 'percent' | 'fixedRate'; hallmark: number; other: number; rate: number; gstEnabled: boolean; gstRate: number; }
export interface CalculationResult extends CalculationInput { metalAmount: number; makingAmount: number; subtotal: number; gst: number; total: number; createdAt: string; }
export interface Settings { isDarkMode: boolean; currency: 'INR'; gstEnabled: boolean; gstRate: number; }
export interface JewelleryFormValues { weight: string; makingPercent: string; makingChargeType: 'percent' | 'fixedRate'; hallmark: string; other: string; }
