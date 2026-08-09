// ── Finance Calculators ──────────────────────────────────────────────────────

/** EMI = P × r × (1+r)^n / ((1+r)^n − 1) */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): { emi: number; totalAmount: number; totalInterest: number } {
  if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) {
    throw new Error("All values must be greater than zero");
  }
  const r = annualRate / 12 / 100;
  const n = tenureMonths;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - principal;
  return {
    emi: round(emi, 2),
    totalAmount: round(totalAmount, 2),
    totalInterest: round(totalInterest, 2),
  };
}

/** SIP Maturity = P × ((1+r)^n − 1) / r × (1+r) */
export function calculateSIP(
  monthlyInvestment: number,
  annualReturnRate: number,
  years: number
): { investedAmount: number; estimatedReturns: number; maturityValue: number } {
  if (monthlyInvestment <= 0 || annualReturnRate <= 0 || years <= 0) {
    throw new Error("All values must be greater than zero");
  }
  const r = annualReturnRate / 12 / 100;
  const n = years * 12;
  const maturityValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const investedAmount = monthlyInvestment * n;
  const estimatedReturns = maturityValue - investedAmount;
  return {
    investedAmount: round(investedAmount, 2),
    estimatedReturns: round(estimatedReturns, 2),
    maturityValue: round(maturityValue, 2),
  };
}

/** CI = P × (1 + r/n)^(n×t) */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number // times per year: 1=annual, 2=semi, 4=quarterly, 12=monthly
): { totalAmount: number; interest: number } {
  if (principal <= 0 || annualRate < 0 || years <= 0 || compoundingFrequency <= 0) {
    throw new Error("Invalid input values");
  }
  const r = annualRate / 100;
  const n = compoundingFrequency;
  const t = years;
  const totalAmount = principal * Math.pow(1 + r / n, n * t);
  return {
    totalAmount: round(totalAmount, 2),
    interest: round(totalAmount - principal, 2),
  };
}

/** GST: inclusive → exclusive and vice versa */
export function calculateGST(
  amount: number,
  gstRate: number,
  mode: "add" | "remove"
): { baseAmount: number; gstAmount: number; totalAmount: number; cgst: number; sgst: number } {
  if (amount <= 0 || gstRate <= 0) throw new Error("Amount and GST rate must be positive");
  let baseAmount: number;
  let totalAmount: number;
  if (mode === "add") {
    baseAmount = amount;
    totalAmount = amount * (1 + gstRate / 100);
  } else {
    totalAmount = amount;
    baseAmount = amount / (1 + gstRate / 100);
  }
  const gstAmount = totalAmount - baseAmount;
  return {
    baseAmount: round(baseAmount, 2),
    gstAmount: round(gstAmount, 2),
    totalAmount: round(totalAmount, 2),
    cgst: round(gstAmount / 2, 2),
    sgst: round(gstAmount / 2, 2),
  };
}

/** Discount: savings and final price */
export function calculateDiscount(
  originalPrice: number,
  discountPercent: number
): { finalPrice: number; savings: number; effectiveDiscount: number } {
  if (originalPrice <= 0) throw new Error("Price must be positive");
  if (discountPercent < 0 || discountPercent > 100) throw new Error("Discount must be 0-100%");
  const savings = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - savings;
  return {
    finalPrice: round(finalPrice, 2),
    savings: round(savings, 2),
    effectiveDiscount: round(discountPercent, 2),
  };
}

// ── Math / Percentage ────────────────────────────────────────────────────────

export function calculatePercentage(
  value: number,
  total: number
): number {
  if (total === 0) throw new Error("Total cannot be zero");
  return round((value / total) * 100, 4);
}

export function percentageOf(percent: number, total: number): number {
  return round((percent / 100) * total, 4);
}

export function percentageChange(from: number, to: number): number {
  if (from === 0) throw new Error("Base value cannot be zero");
  return round(((to - from) / Math.abs(from)) * 100, 4);
}

// ── Date Calculators ─────────────────────────────────────────────────────────

export function calculateAge(
  birthDate: Date,
  referenceDate: Date = new Date()
): { years: number; months: number; days: number; totalDays: number } {
  const ref = new Date(referenceDate);
  const birth = new Date(birthDate);
  if (birth > ref) throw new Error("Birth date cannot be in the future");

  let years = ref.getFullYear() - birth.getFullYear();
  let months = ref.getMonth() - birth.getMonth();
  let days = ref.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  const totalDays = Math.floor((ref.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  return { years, months, days, totalDays };
}

export function calculateDateDifference(
  from: Date,
  to: Date
): { days: number; weeks: number; months: number; years: number } {
  const diffMs = Math.abs(to.getTime() - from.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return {
    days,
    weeks: round(days / 7, 2),
    months: round(days / 30.4375, 2),
    years: round(days / 365.25, 2),
  };
}

// ── Health Calculators ───────────────────────────────────────────────────────

export type BMICategory = "Underweight" | "Normal weight" | "Overweight" | "Obese";

export function calculateBMI(
  weightKg: number,
  heightCm: number
): { bmi: number; category: BMICategory } {
  if (weightKg <= 0 || heightCm <= 0) throw new Error("Weight and height must be positive");
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category: BMICategory;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";
  return { bmi: round(bmi, 1), category };
}

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function calculateTDEE(
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: "male" | "female",
  activity: ActivityLevel
): { bmr: number; tdee: number } {
  if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) {
    throw new Error("Invalid inputs");
  }
  // Mifflin-St Jeor equation
  const bmr =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];
  return { bmr: round(bmr, 0), tdee: round(tdee, 0) };
}

// ── Education ────────────────────────────────────────────────────────────────

export function calculateAttendance(
  attended: number,
  total: number
): { percentage: number; required75: number; required80: number; canMiss75: number } {
  if (total <= 0) throw new Error("Total classes must be > 0");
  if (attended < 0 || attended > total) throw new Error("Invalid attended count");
  const percentage = round((attended / total) * 100, 2);

  // Classes needed to reach 75% if below
  let required75 = 0;
  if (percentage < 75) {
    required75 = Math.ceil((0.75 * total - attended) / 0.25);
  }
  let required80 = 0;
  if (percentage < 80) {
    required80 = Math.ceil((0.8 * total - attended) / 0.2);
  }
  const canMiss75 = Math.max(0, Math.floor((attended - 0.75 * total) / 0.75));
  return { percentage, required75, required80, canMiss75 };
}

export interface SubjectGrade {
  credits: number;
  grade: number; // grade points (e.g., 10, 9, 8...)
}

export function calculateCGPA(subjects: SubjectGrade[]): {
  cgpa: number;
  percentage: number;
} {
  if (subjects.length === 0) throw new Error("Add at least one subject");
  const totalCredits = subjects.reduce((s, x) => s + x.credits, 0);
  if (totalCredits === 0) throw new Error("Total credits must be > 0");
  const weightedSum = subjects.reduce((s, x) => s + x.credits * x.grade, 0);
  const cgpa = round(weightedSum / totalCredits, 2);
  const percentage = round((cgpa - 0.75) * 10, 2); // common conversion formula
  return { cgpa, percentage };
}

// ── Converters ───────────────────────────────────────────────────────────────

const LENGTH_TO_METER: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
  nautical_mile: 1852,
};

export function convertLength(value: number, from: string, to: string): number {
  const meters = value * (LENGTH_TO_METER[from] ?? 1);
  return round(meters / (LENGTH_TO_METER[to] ?? 1), 8);
}

const WEIGHT_TO_GRAM: Record<string, number> = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  tonne: 1_000_000,
  oz: 28.3495,
  lb: 453.592,
  stone: 6350.29,
};

export function convertWeight(value: number, from: string, to: string): number {
  const grams = value * (WEIGHT_TO_GRAM[from] ?? 1);
  return round(grams / (WEIGHT_TO_GRAM[to] ?? 1), 8);
}

export function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;
  let celsius: number;
  if (from === "C") celsius = value;
  else if (from === "F") celsius = (value - 32) * (5 / 9);
  else celsius = value - 273.15; // Kelvin

  if (to === "C") return round(celsius, 4);
  if (to === "F") return round(celsius * (9 / 5) + 32, 4);
  return round(celsius + 273.15, 4); // Kelvin
}

// ── Text / Developer ─────────────────────────────────────────────────────────

export function countWords(text: string): {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMin: number;
} {
  const trimmed = text.trim();
  if (!trimmed) {
    return { words: 0, characters: 0, charactersNoSpaces: 0, sentences: 0, paragraphs: 0, readingTimeMin: 0 };
  }
  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = (trimmed.match(/[.!?]+/g) ?? []).length || (trimmed.length > 0 ? 1 : 0);
  const paragraphs = trimmed.split(/\n\s*\n/).filter(Boolean).length;
  const readingTimeMin = round(words / 200, 1); // avg 200 wpm
  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTimeMin };
}

export function encodeBase64(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

export function decodeBase64(b64: string): string {
  try {
    return decodeURIComponent(escape(atob(b64)));
  } catch {
    throw new Error("Invalid Base64 string");
  }
}

export function formatJSON(text: string, indent = 2): string {
  const parsed = JSON.parse(text); // throws on invalid
  return JSON.stringify(parsed, null, indent);
}

export function minifyJSON(text: string): string {
  const parsed = JSON.parse(text);
  return JSON.stringify(parsed);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
