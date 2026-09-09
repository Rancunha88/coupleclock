export interface LoveProfile {
  readonly yourName: string;
  readonly partnerName: string;
  /** ISO date string (yyyy-mm-dd) the relationship began. */
  readonly startDate: string;
  /**
   * URI for a photo the user picked via the image picker. Empty string means
   * no custom photo has been chosen yet, and the bundled placeholder is shown.
   */
  readonly photoUri: string;
}

export const defaultProfile: LoveProfile = {
  yourName: 'Alex',
  partnerName: 'Sam',
  startDate: '2015-06-05',
  photoUri: '',
};
