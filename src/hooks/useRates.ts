import { useEffect, useState } from 'react';
import { DEFAULT_RATES } from '../constants';
import { getRates, saveManualRates } from '../services/rateService';
import { Rates } from '../types';

export function useRates() {
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getRates().then(r => {
      if (!cancelled) {
        setRates(r);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const updateRates = async (patch: Partial<Omit<Rates, 'updatedAt'>>) => {
    const next = await saveManualRates({ ...rates, ...patch } as Omit<Rates, 'updatedAt'>);
    setRates(next);
    return next;
  };

  return { rates, loading, updateRates };
}
