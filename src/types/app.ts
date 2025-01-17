export interface AppConfig {
  /**
   * Font size in rem
   */
  size: number;

  /**
   * Whether to show seconds
   */
  showSeconds: boolean;
}

export const defaultAppConfig: AppConfig = {
  size: 8,
  showSeconds: false
};
