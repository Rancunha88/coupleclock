import type { LoveProfile } from '@/data/mockData';
import { computeLoveStats, parseIsoDate } from '@/utils/love-counter';

import DaysTogetherWidget from './days-together-widget';

const DAYS_AHEAD = 30;

/** Schedules one widget entry per midnight so the count ticks over without opening the app. */
export function syncDaysTogetherWidget(profile: LoveProfile): void {
  const since = parseIsoDate(profile.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const names = `${profile.yourName} & ${profile.partnerName}`;
  const now = new Date();

  const entries = Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const date = i === 0 ? now : new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const days = computeLoveStats(profile.startDate, date).totalDays.toLocaleString('en-US');
    return { date, props: { names, days, since } };
  });

  DaysTogetherWidget.updateTimeline(entries);
}
