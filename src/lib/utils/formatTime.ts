import { FormatTime } from "@/types/time";

interface Options {
  /**
   * The time zone to use
   *
   * @default Intl.DateTimeFormat().resolvedOptions().timeZone
   */
  timeZone?: string;
}

const defaultOptoins: Required<Options> = {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
};

export function splitDigits(num: number): [number, number] {
  if (num >= 100) throw new Error("Number must be less than 100");

  return [Math.floor(num / 10), num % 10];
}

export function formatTime(date: Date, options?: Options): FormatTime {
  const newOptions = { ...defaultOptoins, ...options };

  const localeString = date.toLocaleString("zh", { timeZone: newOptions.timeZone });

  const [year, month, day] = localeString.split(" ")[0].split("/").map(Number);
  const [hour, minute, second] = localeString.split(" ")[1].split(":").map(Number);

  return { year, month, day, hour, minute, second };
}
