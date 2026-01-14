type InputValue = string | number | null | undefined;

function processInput(inputValue: InputValue): number | null {
  if (inputValue == null || Number.isNaN(Number(inputValue))) return null;
  return Number(inputValue);
}

// ----------------------------------------------------------------------

export function fNumber(
  inputValue: InputValue,
  options?: Intl.NumberFormatOptions
): string {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fCurrency(
  inputValue: InputValue,
  options?: Intl.NumberFormatOptions
): string {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fPercent(
  inputValue: InputValue,
  options?: Intl.NumberFormatOptions
): string {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat("id-ID", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
  }).format(number / 100);

  return fm;
}

// ----------------------------------------------------------------------

export function fShortenNumber(
  inputValue: InputValue,
  options?: Intl.NumberFormatOptions
): string {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputValue): string {
  const number = processInput(inputValue);
  if (number === null || number === 0) return "0 bytes";

  const units = ["bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];
  const decimal = 2;
  const baseValue = 1024;

  const index = Math.floor(Math.log(number) / Math.log(baseValue));
  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${
    units[index]
  }`;

  return fm;
}
