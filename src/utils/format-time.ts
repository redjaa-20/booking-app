import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

// ------------------------------------------------------------
// CONFIG
// ------------------------------------------------------------

dayjs.locale("id"); // Set default locale Indonesia
dayjs.extend(duration);
dayjs.extend(relativeTime);

export const INVALID_DATE = "Invalid";

// ------------------------------------------------------------
// FORMAT PATTERNS
// ------------------------------------------------------------

export const FORMAT_PATTERNS = {
  dateTime: "DD MMM YYYY HH:mm", // Contoh: 17 Apr 2022 00:00
  date: "DD MMM YYYY", // Contoh: 17 Apr 2022
  time: "HH:mm", // Contoh: 00:00
  split: {
    dateTime: "DD/MM/YYYY HH:mm",
    date: "DD/MM/YYYY",
  },
  paramCase: {
    dateTime: "DD-MM-YYYY HH:mm",
    date: "DD-MM-YYYY",
  },
} as const;

export type FormatTemplate = string;

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

export function today(template: FormatTemplate) {
  return dayjs().startOf("day").format(template);
}

// ------------------------------------------------------------
// FORMATTERS
// ------------------------------------------------------------

export function fDateTime(
  input: dayjs.ConfigType,
  template: FormatTemplate = FORMAT_PATTERNS.dateTime
) {
  if (!input) return "";
  const date = dayjs(input);
  return date.isValid() ? date.format(template) : INVALID_DATE;
}

export function fDate(
  input: dayjs.ConfigType,
  template: FormatTemplate = FORMAT_PATTERNS.date
) {
  if (!input) return "";
  const date = dayjs(input);
  return date.isValid() ? date.format(template) : INVALID_DATE;
}

export function fTime(
  input: dayjs.ConfigType,
  template: FormatTemplate = FORMAT_PATTERNS.time
) {
  if (!input) return "";
  const date = dayjs(input);
  return date.isValid() ? date.format(template) : INVALID_DATE;
}

// ------------------------------------------------------------
// TIMESTAMP
// ------------------------------------------------------------

export function fTimestamp(input: dayjs.ConfigType) {
  if (!input) return "";
  const date = dayjs(input);
  return date.isValid() ? date.valueOf() : INVALID_DATE;
}

// ------------------------------------------------------------
// RELATIVE TIME
// ------------------------------------------------------------

export function fToNow(input: dayjs.ConfigType) {
  if (!input) return "";
  const date = dayjs(input);
  return date.isValid() ? date.toNow(true) : INVALID_DATE;
}

export function fRemainingDays(input: dayjs.ConfigType) {
  if (!input) return "";
  const date = dayjs(input);
  if (!date.isValid()) return INVALID_DATE;

  const now = dayjs();
  const diff = date.diff(now, "days");

  return `${diff} hari`;
}

// ------------------------------------------------------------
// DATE LOGIC
// ------------------------------------------------------------

export function fIsBetween(
  input: dayjs.ConfigType,
  start: dayjs.ConfigType,
  end: dayjs.ConfigType
) {
  if (!input || !start || !end) return false;

  const i = dayjs(input);
  const s = dayjs(start);
  const e = dayjs(end);

  if (!i.isValid() || !s.isValid() || !e.isValid()) return false;

  const iv = i.valueOf();
  const sv = s.valueOf();
  const ev = e.valueOf();

  return iv >= Math.min(sv, ev) && iv <= Math.max(sv, ev);
}

export function fIsAfter(start: dayjs.ConfigType, end: dayjs.ConfigType) {
  if (!start || !end) return false;

  const s = dayjs(start);
  const e = dayjs(end);

  if (!s.isValid() || !e.isValid()) return false;

  return s.isAfter(e);
}

export function fIsSame(
  start: dayjs.ConfigType,
  end: dayjs.ConfigType,
  unit: dayjs.OpUnitType = "year"
) {
  if (!start || !end) return false;

  const s = dayjs(start);
  const e = dayjs(end);

  if (!s.isValid() || !e.isValid()) return false;

  return s.isSame(e, unit);
}

// ------------------------------------------------------------
// RANGE LABEL
// ------------------------------------------------------------

export function fDateRangeShortLabel(
  start: dayjs.ConfigType,
  end: dayjs.ConfigType,
  initial?: boolean
) {
  if (!start || !end) return "";

  const s = dayjs(start);
  const e = dayjs(end);

  if (!s.isValid() || !e.isValid() || s.isAfter(e)) return INVALID_DATE;

  if (initial) return `${fDate(s)} - ${fDate(e)}`;

  const sameDay = s.isSame(e, "day");
  const sameMonth = s.isSame(e, "month");
  const sameYear = s.isSame(e, "year");

  if (sameDay) return fDate(e);

  if (sameMonth) return `${fDate(s, "DD")} - ${fDate(e)}`;

  if (sameYear) return `${fDate(s, "DD MMM")} - ${fDate(e)}`;

  return `${fDate(s)} - ${fDate(e)}`;
}

// ------------------------------------------------------------
// ADD & SUBTRACT
// ------------------------------------------------------------

export interface DurationInput {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export function fAdd(d: DurationInput) {
  const result = dayjs().add(dayjs.duration(d)).format();
  return result;
}

export function fSub(d: DurationInput) {
  const result = dayjs().subtract(dayjs.duration(d)).format();
  return result;
}
