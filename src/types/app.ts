import z from "zod";

export const AppConfig = z.object({
  /**
   * Font size in rem
   */
  size: z.number(),

  /**
   * Whether to keep the screen awake
   */
  keepAwake: z.boolean(),

  /**
   * Whether to show seconds
   */
  showSeconds: z.boolean(),

  /**
   * Whether to show background
   */
  showBackground: z.boolean()
});
export type AppConfigType = z.infer<typeof AppConfig>;

export const defaultAppConfig: AppConfigType = {
  size: 6,
  keepAwake: false,
  showSeconds: false,
  showBackground: false
};
