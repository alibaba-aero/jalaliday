import { PluginFunc, ConfigType } from 'dayjs';

declare const plugin: PluginFunc;
export = plugin;

type calendarType = 'jalali' | 'gregory';

declare module 'dayjs' {
  interface Dayjs {
    calendar(calendarType: calendarType): Dayjs;

    isJalali(): boolean;
  }
}
