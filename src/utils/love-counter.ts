export interface LoveStats {
  readonly years: number;
  readonly months: number;
  readonly days: number;
  readonly totalDays: number;
  readonly nextAnniversaryDaysLeft: number;
  readonly nextAnniversaryProgress: number;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function diffInDays(from: Date, to: Date): number {
  const ms = startOfDay(to).getTime() - startOfDay(from).getTime();
  return Math.round(ms / 86_400_000);
}

function getYearsMonthsDays(start: Date, now: Date) {
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += lastDayOfPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function getNextAnniversary(start: Date, today: Date) {
  let next = new Date(today.getFullYear(), start.getMonth(), start.getDate());
  if (next.getTime() <= today.getTime()) {
    next = new Date(today.getFullYear() + 1, start.getMonth(), start.getDate());
  }
  const previous = new Date(next.getFullYear() - 1, start.getMonth(), start.getDate());
  const totalSpan = diffInDays(previous, next);
  const elapsed = diffInDays(previous, today);
  const progress = totalSpan > 0 ? Math.min(1, Math.max(0, elapsed / totalSpan)) : 0;
  return { daysLeft: diffInDays(today, next), progress };
}

export function computeLoveStats(startDateIso: string, now: Date = new Date()): LoveStats {
  const start = startOfDay(parseIsoDate(startDateIso));
  const today = startOfDay(now);
  const { years, months, days } = getYearsMonthsDays(start, today);
  const { daysLeft, progress } = getNextAnniversary(start, today);

  return {
    years,
    months,
    days,
    totalDays: Math.max(0, diffInDays(start, today)),
    nextAnniversaryDaysLeft: daysLeft,
    nextAnniversaryProgress: progress,
  };
}

export function formatLongDate(iso: string): string {
  const date = parseIsoDate(iso);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
}
