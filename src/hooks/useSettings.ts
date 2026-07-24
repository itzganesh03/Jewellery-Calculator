import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS } from '../constants';
import { storage } from '../storage/storage';
import { Settings } from '../types';
export function useSettings() { const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS); const [ready, setReady] = useState(false); useEffect(() => { storage.getSettings().then(v => { setSettings(v); setReady(true); }); }, []); const update = async (patch: Partial<Settings>) => { const next = { ...settings, ...patch }; setSettings(next); await storage.saveSettings(next); }; return { settings, update, ready }; }
