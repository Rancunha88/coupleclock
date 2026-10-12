import type { LoveProfile } from '@/data/mockData';
import { computeLoveStats, parseIsoDate } from '@/utils/love-counter';

import { CountdownDark, CountdownLight } from './countdown-widget';
import { TimeTogetherDark, TimeTogetherLight } from './time-together-widget';

const DAYS_AHEAD = 30;

/** Schedules one widget entry per midnight so the counts tick over without opening the app. */
export function syncWidgets(profile: LoveProfile): void {
  const since = parseIsoDate(profile.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const { yourName, partnerName } = profile;
  const now = new Date();

  const entries = Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const date = i === 0 ? now : new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const stats = computeLoveStats(profile.startDate, date);
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + stats.nextAnniversaryDaysLeft);
    return {
      date,
      countdown: {
        yourName,
        partnerName,
        days: String(stats.nextAnniversaryDaysLeft),
        label: stats.years === 0 ? 'until first birthday' : 'until next birthday',
        date: next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        progress: stats.nextAnniversaryProgress,
      },
      together: { yourName, partnerName, years: stats.years, months: stats.months, days: stats.days, since },
    };
  });

  CountdownDark.updateTimeline(entries.map((e) => ({ date: e.date, props: { ...e.countdown, light: false } })));
  CountdownLight.updateTimeline(entries.map((e) => ({ date: e.date, props: { ...e.countdown, light: true } })));
  TimeTogetherDark.updateTimeline(entries.map((e) => ({ date: e.date, props: { ...e.together, light: false } })));
  TimeTogetherLight.updateTimeline(entries.map((e) => ({ date: e.date, props: { ...e.together, light: true } })));
}
