import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../api/api.js';

const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£' };

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshSettings = useCallback(async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (err) {
      console.error('Failed to load settings', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSettings();
  }, [refreshSettings]);

  const currencySymbol = CURRENCY_SYMBOLS[settings?.currency] || '$';

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings, currencySymbol }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}