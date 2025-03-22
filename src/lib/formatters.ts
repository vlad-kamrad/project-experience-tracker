import { differenceInDays, differenceInMonths } from "date-fns";

export const formatDuration = (startDate: Date, endDate: Date | null) => {
  const end = endDate || new Date();
  const months = differenceInMonths(end, startDate);

  if (months < 1) {
    const days = differenceInDays(end, startDate);
    return `${days} day${days !== 1 ? "s" : ""}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let result = "";
  if (years > 0) {
    result += `${years} year${years !== 1 ? "s" : ""}`;
  }

  if (remainingMonths > 0) {
    if (result) {
      result += ", ";
    }

    result += `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  }

  return result;
};

export const formatExperienceInMonths = (months: number) => {
  if (months < 1) {
    return "< 1 month";
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let result = "";
  if (years > 0) {
    result += `${years} year${years !== 1 ? "s" : ""}`;
  }

  if (remainingMonths > 0) {
    if (result) {
      result += ", ";
    }

    result += `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  }

  return result;
};
