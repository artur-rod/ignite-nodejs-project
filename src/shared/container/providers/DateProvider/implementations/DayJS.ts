import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayJS implements IDateProvider {
  dateNow() {
    return dayjs().toDate();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const startDateUTC = this.convertToUTC(start_date);
    const endDateUTC = this.convertToUTC(end_date);

    return dayjs(endDateUTC).diff(startDateUTC, "hours");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const startDateUTC = this.convertToUTC(start_date);
    const endDateUTC = this.convertToUTC(end_date);

    return dayjs(endDateUTC).diff(startDateUTC, "days");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}

export { DayJS };
