import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { defaultProfile, type LoveProfile } from '@/data/mockData';
import { syncWidgets } from '@/widgets/sync-widgets';

const STORAGE_KEY = 'love-counter/profile';

interface LoveProfileContextValue {
  readonly profile: LoveProfile;
  readonly isLoading: boolean;
  readonly updateProfile: (patch: Partial<LoveProfile>) => Promise<void>;
}

export const LoveProfileContext = createContext<LoveProfileContextValue | undefined>(undefined);

export interface LoveProfileProviderProps {
  readonly children: ReactNode;
}

export function LoveProfileProvider({ children }: LoveProfileProviderProps) {
  const [profile, setProfile] = useState<LoveProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (isMounted && stored) {
          setProfile({ ...defaultProfile, ...JSON.parse(stored) });
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) syncWidgets(profile);
  }, [profile, isLoading]);

  const updateProfile = useCallback(async (patch: Partial<LoveProfile>) => {
    setProfile((current) => {
      const next = { ...current, ...patch };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {
        // Persisting is best-effort; the in-memory state remains correct for this session.
      });
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ profile, isLoading, updateProfile }),
    [profile, isLoading, updateProfile],
  );

  return <LoveProfileContext.Provider value={value}>{children}</LoveProfileContext.Provider>;
}

export function useLoveProfile(): LoveProfileContextValue {
  const context = use(LoveProfileContext);
  if (!context) {
    throw new Error('LoveProfile must be used within a LoveProfileProvider');
  }
  return context;
}
