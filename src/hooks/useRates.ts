import { useQuery } from '@tanstack/react-query';
import { RATE_REFRESH_MS } from '../constants';
import { getRates } from '../services/rateService';
export const useRates = (enabled = true) => useQuery({ queryKey: ['rates'], queryFn: getRates, refetchInterval: enabled ? RATE_REFRESH_MS : false, staleTime: RATE_REFRESH_MS, retry: 1 });
