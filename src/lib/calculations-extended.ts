// ── Extended Calculations Library ────────────────────────────────────────────
// New functions added to supplement src/lib/calculations.ts

// ── Finance: Simple Interest ──────────────────────────────────────────────────
export function calculateSimpleInterest(
  principal: number, rate: number, years: number
): { interest: number; totalAmount: number } {
  if (principal <= 0 || rate < 0 || years <= 0) throw new Error("All values must be positive");
  const interest = round((principal * rate * years) / 100, 2);
  return { interest, totalAmount: round(principal + interest, 2) };
}

// ── Finance: FD ───────────────────────────────────────────────────────────────
export function calculateFD(
  principal: number, rate: number, years: number, freq: number
): { maturityAmount: number; interest: number } {
  if (principal <= 0 || rate <= 0 || years <= 0) throw new Error("All values must be positive");
  const maturityAmount = round(principal * Math.pow(1 + rate / (100 * freq), freq * years), 2);
  return { maturityAmount, interest: round(maturityAmount - principal, 2) };
}

// ── Finance: RD ───────────────────────────────────────────────────────────────
export function calculateRD(
  monthlyDeposit: number, rate: number, months: number
): { maturityAmount: number; totalDeposited: number; interest: number } {
  if (monthlyDeposit <= 0 || rate <= 0 || months <= 0) throw new Error("All values must be positive");
  const r = rate / (4 * 100);
  const n = months / 3;
  const maturityAmount = round(monthlyDeposit * (Math.pow(1 + r, n * 4 / 4 + 1) - (1 + r)) / r * (1 / (1 + r)), 2);
  // Standard RD formula: M = R × [(1+i)^n - 1] / [1-(1+i)^(-1/3)]
  const i = rate / 400;
  const mat = round(monthlyDeposit * ((Math.pow(1 + i, months / 3 + 1) - (1 + i)) / (1 - Math.pow(1 + i, -1 / 3))), 2);
  const totalDeposited = round(monthlyDeposit * months, 2);
  return { maturityAmount: mat, totalDeposited, interest: round(mat - totalDeposited, 2) };
}

// ── Finance: Lumpsum ──────────────────────────────────────────────────────────
export function calculateLumpsum(
  principal: number, rate: number, years: number
): { maturityValue: number; gain: number } {
  if (principal <= 0 || rate < 0 || years <= 0) throw new Error("All values must be positive");
  const maturityValue = round(principal * Math.pow(1 + rate / 100, years), 2);
  return { maturityValue, gain: round(maturityValue - principal, 2) };
}

// ── Finance: CAGR ─────────────────────────────────────────────────────────────
export function calculateCAGR(
  beginValue: number, endValue: number, years: number
): number {
  if (beginValue <= 0 || endValue <= 0 || years <= 0) throw new Error("All values must be positive");
  return round((Math.pow(endValue / beginValue, 1 / years) - 1) * 100, 4);
}

// ── Finance: ROI ──────────────────────────────────────────────────────────────
export function calculateROI(
  investment: number, finalValue: number
): { roi: number; netProfit: number } {
  if (investment <= 0) throw new Error("Investment must be positive");
  const netProfit = round(finalValue - investment, 2);
  const roi = round((netProfit / investment) * 100, 4);
  return { roi, netProfit };
}

// ── Finance: Profit Margin ────────────────────────────────────────────────────
export function calculateProfitMargin(
  revenue: number, cost: number
): { grossProfit: number; margin: number; markup: number } {
  if (revenue <= 0) throw new Error("Revenue must be positive");
  const grossProfit = round(revenue - cost, 2);
  const margin = round((grossProfit / revenue) * 100, 4);
  const markup = cost > 0 ? round((grossProfit / cost) * 100, 4) : 0;
  return { grossProfit, margin, markup };
}

// ── Finance: Markup ───────────────────────────────────────────────────────────
export function calculateMarkup(
  cost: number, markup: number
): { sellingPrice: number; profit: number } {
  if (cost <= 0) throw new Error("Cost must be positive");
  const profit = round((cost * markup) / 100, 2);
  return { sellingPrice: round(cost + profit, 2), profit };
}

// ── Finance: Break-even ───────────────────────────────────────────────────────
export function calculateBreakEven(
  fixedCost: number, sellingPrice: number, variableCostPerUnit: number
): { breakEvenUnits: number; breakEvenRevenue: number } {
  const cm = sellingPrice - variableCostPerUnit;
  if (cm <= 0) throw new Error("Contribution margin must be positive (selling price > variable cost)");
  if (fixedCost < 0) throw new Error("Fixed cost cannot be negative");
  const breakEvenUnits = round(fixedCost / cm, 2);
  return { breakEvenUnits, breakEvenRevenue: round(breakEvenUnits * sellingPrice, 2) };
}

// ── Finance: Inflation ────────────────────────────────────────────────────────
export function calculateInflation(
  amount: number, rate: number, years: number
): { futureValue: number; purchasing_power_loss: number } {
  if (amount <= 0 || years <= 0) throw new Error("Amount and years must be positive");
  const futureValue = round(amount * Math.pow(1 + rate / 100, years), 2);
  return { futureValue, purchasing_power_loss: round(futureValue - amount, 2) };
}

// ── Finance: Credit Card Payoff ───────────────────────────────────────────────
export function calculateCreditCardPayoff(
  balance: number, apr: number, monthlyPayment: number
): { months: number; totalInterest: number; totalPaid: number } {
  if (balance <= 0 || apr <= 0 || monthlyPayment <= 0) throw new Error("All values must be positive");
  const r = apr / 12 / 100;
  const minPayment = balance * r;
  if (monthlyPayment <= minPayment) throw new Error("Monthly payment must exceed minimum interest charge");
  const months = Math.ceil(-Math.log(1 - (balance * r) / monthlyPayment) / Math.log(1 + r));
  const totalPaid = round(months * monthlyPayment, 2);
  return { months, totalInterest: round(totalPaid - balance, 2), totalPaid };
}

// ── Finance: Savings Goal ─────────────────────────────────────────────────────
export function calculateSavingsGoal(
  target: number, current: number, rate: number, years: number
): { monthlyRequired: number; totalContributions: number } {
  if (target <= 0 || years <= 0) throw new Error("Target and years must be positive");
  const r = rate / 12 / 100;
  const n = years * 12;
  const futureCurrentValue = current * Math.pow(1 + r, n);
  const remaining = target - futureCurrentValue;
  if (remaining <= 0) return { monthlyRequired: 0, totalContributions: 0 };
  const monthlyRequired = round(remaining * r / (Math.pow(1 + r, n) - 1), 2);
  return { monthlyRequired, totalContributions: round(monthlyRequired * n, 2) };
}

// ── Finance: Emergency Fund ───────────────────────────────────────────────────
export function calculateEmergencyFund(
  monthlyExpenses: number, months: number
): { targetFund: number } {
  if (monthlyExpenses <= 0 || months <= 0) throw new Error("Both values must be positive");
  return { targetFund: round(monthlyExpenses * months, 2) };
}

// ── Finance: Retirement Corpus ────────────────────────────────────────────────
export function calculateRetirementCorpus(
  currentAge: number, retirementAge: number, monthlyExpenses: number,
  inflationRate: number, postRetirementReturn: number, lifeExpectancy: number
): { corpusRequired: number; inflatedMonthlyExpenses: number } {
  const yearsToRetirement = retirementAge - currentAge;
  const retirementYears = lifeExpectancy - retirementAge;
  if (yearsToRetirement <= 0 || retirementYears <= 0) throw new Error("Invalid age inputs");
  const inflatedMonthly = round(monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement), 2);
  const monthlyReturn = postRetirementReturn / 12 / 100;
  const n = retirementYears * 12;
  const corpusRequired = round(inflatedMonthly * (1 - Math.pow(1 + monthlyReturn, -n)) / monthlyReturn, 2);
  return { corpusRequired, inflatedMonthlyExpenses: inflatedMonthly };
}

// ── Math: Statistics ──────────────────────────────────────────────────────────
export function calculateStatistics(numbers: number[]): {
  mean: number; median: number; mode: number[]; min: number; max: number;
  range: number; variance: number; stdDev: number; sum: number; count: number;
} {
  if (numbers.length === 0) throw new Error("Enter at least one number");
  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = round(sum / numbers.length, 6);
  const n = numbers.length;
  const median = n % 2 === 0
    ? round((sorted[n / 2 - 1] + sorted[n / 2]) / 2, 6)
    : sorted[Math.floor(n / 2)];

  // Mode
  const freq: Record<number, number> = {};
  for (const x of numbers) freq[x] = (freq[x] || 0) + 1;
  const maxFreq = Math.max(...Object.values(freq));
  const mode = maxFreq === 1 ? [] : Object.keys(freq).filter(k => freq[Number(k)] === maxFreq).map(Number);

  const variance = round(numbers.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0) / n, 6);
  return {
    mean, median, mode,
    min: sorted[0], max: sorted[n - 1],
    range: round(sorted[n - 1] - sorted[0], 6),
    variance, stdDev: round(Math.sqrt(variance), 6),
    sum: round(sum, 6), count: n,
  };
}

// ── Math: Ratio ───────────────────────────────────────────────────────────────
export function simplifyRatio(a: number, b: number): { a: number; b: number } {
  if (a <= 0 || b <= 0) throw new Error("Both values must be positive");
  const g = gcd(Math.round(a), Math.round(b));
  return { a: a / g, b: b / g };
}

export function solveProportion(a: number, b: number, c: number): number {
  // a/b = c/x  →  x = b*c/a
  if (a === 0) throw new Error("First value cannot be zero");
  return round((b * c) / a, 6);
}

// ── Math: Fraction ────────────────────────────────────────────────────────────
export interface Fraction { num: number; den: number; }

export function fractionOp(a: Fraction, b: Fraction, op: "+" | "-" | "*" | "/"): Fraction {
  let num: number, den: number;
  switch (op) {
    case "+": num = a.num * b.den + b.num * a.den; den = a.den * b.den; break;
    case "-": num = a.num * b.den - b.num * a.den; den = a.den * b.den; break;
    case "*": num = a.num * b.num; den = a.den * b.den; break;
    case "/":
      if (b.num === 0) throw new Error("Cannot divide by zero");
      num = a.num * b.den; den = a.den * b.num; break;
  }
  return simplifyFraction({ num, den });
}

export function simplifyFraction(f: Fraction): Fraction {
  if (f.den === 0) throw new Error("Denominator cannot be zero");
  const g = gcd(Math.abs(f.num), Math.abs(f.den));
  const sign = f.den < 0 ? -1 : 1;
  return { num: sign * f.num / g, den: sign * f.den / g };
}

// ── Math: LCM / HCF ──────────────────────────────────────────────────────────
export function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function lcmMany(nums: number[]): number {
  return nums.reduce(lcm);
}

export function gcdMany(nums: number[]): number {
  return nums.reduce(gcd);
}

// ── Math: Prime ───────────────────────────────────────────────────────────────
export function checkPrime(n: number): { isPrime: boolean; factors: number[] } {
  if (n < 2) return { isPrime: false, factors: n < 1 ? [] : [1] };
  const factors: number[] = [1];
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) { factors.push(i); if (i !== n / i) factors.push(n / i); }
  }
  factors.push(n);
  return { isPrime: factors.length === 2, factors: factors.sort((a, b) => a - b) };
}

// ── Math: Factorial ───────────────────────────────────────────────────────────
export function factorial(n: number): bigint {
  if (n < 0 || !Number.isInteger(n)) throw new Error("Input must be a non-negative integer");
  if (n > 170) throw new Error("Input too large (max 170)");
  let result = BigInt(1);
  for (let i = 2; i <= n; i++) result *= BigInt(i);
  return result;
}

// ── Math: Quadratic ───────────────────────────────────────────────────────────
export function solveQuadratic(a: number, b: number, c: number): {
  discriminant: number; roots: (number | string)[];
  nature: "two real" | "one real" | "complex";
} {
  if (a === 0) throw new Error("Coefficient 'a' cannot be zero");
  const discriminant = round(b * b - 4 * a * c, 6);
  if (discriminant > 0) {
    const r1 = round((-b + Math.sqrt(discriminant)) / (2 * a), 6);
    const r2 = round((-b - Math.sqrt(discriminant)) / (2 * a), 6);
    return { discriminant, roots: [r1, r2], nature: "two real" };
  } else if (discriminant === 0) {
    return { discriminant, roots: [round(-b / (2 * a), 6)], nature: "one real" };
  } else {
    const real = round(-b / (2 * a), 6);
    const imag = round(Math.sqrt(-discriminant) / (2 * a), 6);
    return { discriminant, roots: [`${real} + ${imag}i`, `${real} − ${imag}i`], nature: "complex" };
  }
}

// ── Math: Permutation & Combination ──────────────────────────────────────────
export function permutation(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) throw new Error("Invalid n, r values");
  if (r === 0) return 1;
  let result = 1;
  for (let i = n; i > n - r; i--) result *= i;
  return result;
}

export function combination(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) throw new Error("Invalid n, r values");
  return permutation(n, r) / permutation(r, r);
}

// ── Math: Pythagorean ─────────────────────────────────────────────────────────
export function pythagorean(a: number | null, b: number | null, c: number | null): number {
  if (a === null && b !== null && c !== null) return round(Math.sqrt(c * c - b * b), 6);
  if (b === null && a !== null && c !== null) return round(Math.sqrt(c * c - a * a), 6);
  if (c === null && a !== null && b !== null) return round(Math.sqrt(a * a + b * b), 6);
  throw new Error("Provide exactly two values");
}

// ── Date: Add/Subtract Days ───────────────────────────────────────────────────
export function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// ── Health: BMR ───────────────────────────────────────────────────────────────
export function calculateBMR(
  weightKg: number, heightCm: number, ageYears: number, gender: "male" | "female"
): number {
  if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) throw new Error("Invalid inputs");
  return gender === "male"
    ? round(10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5, 0)
    : round(10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161, 0);
}

// ── Health: Ideal Weight ──────────────────────────────────────────────────────
export function calculateIdealWeight(heightCm: number, gender: "male" | "female"): {
  hamwi: number; devine: number; robinson: number; miller: number;
} {
  if (heightCm <= 0) throw new Error("Height must be positive");
  const h = heightCm / 2.54; // inches
  const over60 = Math.max(0, h - 60);
  const kg = (lbs: number) => round(lbs * 0.453592, 1);
  return {
    hamwi:   gender === "male" ? kg(106 + 6 * over60) : kg(100 + 5 * over60),
    devine:  gender === "male" ? round(50 + 2.3 * over60, 1) : round(45.5 + 2.3 * over60, 1),
    robinson:gender === "male" ? round(52 + 1.9 * over60, 1) : round(49 + 1.7 * over60, 1),
    miller:  gender === "male" ? round(56.2 + 1.41 * over60, 1) : round(53.1 + 1.36 * over60, 1),
  };
}

// ── Health: Running Pace ──────────────────────────────────────────────────────
export function calculateRunningPace(
  distanceKm: number, timeMinutes: number
): { paceMinPerKm: string; speedKmh: number; speedMph: number } {
  if (distanceKm <= 0 || timeMinutes <= 0) throw new Error("Distance and time must be positive");
  const paceMin = timeMinutes / distanceKm;
  const mins = Math.floor(paceMin);
  const secs = Math.round((paceMin - mins) * 60);
  return {
    paceMinPerKm: `${mins}:${secs.toString().padStart(2, "0")}`,
    speedKmh: round(distanceKm / (timeMinutes / 60), 2),
    speedMph: round((distanceKm / 1.60934) / (timeMinutes / 60), 2),
  };
}

// ── Health: Water Intake ──────────────────────────────────────────────────────
export function calculateWaterIntake(
  weightKg: number, activityLevel: "sedentary" | "moderate" | "active"
): { liters: number; cups: number; glasses: number } {
  if (weightKg <= 0) throw new Error("Weight must be positive");
  const baseML = weightKg * 35;
  const actMult = activityLevel === "active" ? 1.25 : activityLevel === "moderate" ? 1.1 : 1.0;
  const ml = baseML * actMult;
  return {
    liters: round(ml / 1000, 2),
    cups: Math.ceil(ml / 240),
    glasses: Math.ceil(ml / 250),
  };
}

// ── Text: Case Converter ──────────────────────────────────────────────────────
export function convertCase(text: string, mode: string): string {
  switch (mode) {
    case "upper": return text.toUpperCase();
    case "lower": return text.toLowerCase();
    case "title": return text.replace(/\b\w/g, c => c.toUpperCase());
    case "sentence": return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "camel": return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
    case "snake": return text.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    case "kebab": return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    default: return text;
  }
}

// ── Text: Slug ────────────────────────────────────────────────────────────────
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Text: Sort Lines ──────────────────────────────────────────────────────────
export function sortLines(text: string, mode: "az" | "za" | "length-asc" | "length-desc" | "numeric"): string {
  const lines = text.split("\n");
  const sorted = [...lines];
  switch (mode) {
    case "az": sorted.sort((a, b) => a.localeCompare(b)); break;
    case "za": sorted.sort((a, b) => b.localeCompare(a)); break;
    case "length-asc": sorted.sort((a, b) => a.length - b.length); break;
    case "length-desc": sorted.sort((a, b) => b.length - a.length); break;
    case "numeric": sorted.sort((a, b) => parseFloat(a) - parseFloat(b)); break;
  }
  return sorted.join("\n");
}

// ── Text: Remove Duplicates ───────────────────────────────────────────────────
export function removeDuplicateLines(text: string, caseSensitive: boolean): string {
  const lines = text.split("\n");
  const seen = new Set<string>();
  return lines.filter(line => {
    const key = caseSensitive ? line : line.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).join("\n");
}

// ── Dev: URL Encode/Decode ────────────────────────────────────────────────────
export function urlEncode(text: string): string { return encodeURIComponent(text); }
export function urlDecode(text: string): string {
  try { return decodeURIComponent(text); }
  catch { throw new Error("Invalid URL-encoded string"); }
}

// ── Dev: Color Converter ──────────────────────────────────────────────────────
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{3,6}$/.test(clean)) throw new Error("Invalid hex color");
  const full = clean.length === 3
    ? clean.split("").map(c => c + c).join("")
    : clean;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r1) h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
    else if (max === g1) h = (b1 - r1) / d + 2;
    else h = (r1 - g1) / d + 4;
    h /= 6;
  }
  return { h: round(h * 360, 0), s: round(s * 100, 1), l: round(l * 100, 1) };
}

// ── Converters: Area ──────────────────────────────────────────────────────────
const AREA_TO_SQM: Record<string, number> = {
  sqmm: 1e-6, sqcm: 1e-4, sqm: 1, sqkm: 1e6,
  sqin: 0.00064516, sqft: 0.0929, sqyd: 0.8361, sqmi: 2589988,
  acre: 4047, hectare: 10000,
};
export function convertArea(value: number, from: string, to: string): number {
  return round(value * (AREA_TO_SQM[from] / AREA_TO_SQM[to]), 8);
}

// ── Converters: Volume ────────────────────────────────────────────────────────
const VOL_TO_ML: Record<string, number> = {
  ml: 1, l: 1000, cup: 236.588, tbsp: 14.787, tsp: 4.929,
  floz: 29.574, pint: 473.176, quart: 946.353, gallon: 3785.41,
  cm3: 1, m3: 1e6, ft3: 28316.8,
};
export function convertVolume(value: number, from: string, to: string): number {
  return round(value * (VOL_TO_ML[from] / VOL_TO_ML[to]), 8);
}

// ── Converters: Speed ─────────────────────────────────────────────────────────
const SPEED_TO_MS: Record<string, number> = {
  ms: 1, kmh: 1 / 3.6, mph: 0.44704, knot: 0.514444, fps: 0.3048,
};
export function convertSpeed(value: number, from: string, to: string): number {
  return round(value * (SPEED_TO_MS[from] / SPEED_TO_MS[to]), 8);
}

// ── Converters: Data Storage ──────────────────────────────────────────────────
const DATA_TO_BITS: Record<string, number> = {
  bit: 1, byte: 8, kb: 8e3, mb: 8e6, gb: 8e9, tb: 8e12,
  kib: 8192, mib: 8388608, gib: 8589934592, tib: 8796093022208,
};
export function convertDataStorage(value: number, from: string, to: string): number {
  return round(value * (DATA_TO_BITS[from] / DATA_TO_BITS[to]), 8);
}

// ── Converters: Angle ─────────────────────────────────────────────────────────
export function convertAngle(value: number, from: string, to: string): number {
  let degrees: number;
  if (from === "deg") degrees = value;
  else if (from === "rad") degrees = value * (180 / Math.PI);
  else degrees = value * 0.9; // gradian
  if (to === "deg") return round(degrees, 6);
  if (to === "rad") return round(degrees * (Math.PI / 180), 8);
  return round(degrees / 0.9, 6); // gradian
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
