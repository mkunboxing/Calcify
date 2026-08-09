import { describe, it, expect } from "vitest";
import {
  calculateEMI,
  calculateSIP,
  calculateCompoundInterest,
  calculateGST,
  calculateDiscount,
  calculatePercentage,
  percentageOf,
  percentageChange,
  calculateAge,
  calculateDateDifference,
  calculateBMI,
  calculateTDEE,
  calculateAttendance,
  calculateCGPA,
  convertLength,
  convertWeight,
  convertTemperature,
  countWords,
  encodeBase64,
  decodeBase64,
  formatJSON,
  minifyJSON,
} from "@/lib/calculations";

// ── EMI ──────────────────────────────────────────────────────────────────────
describe("calculateEMI", () => {
  it("calculates correct EMI for standard loan", () => {
    const result = calculateEMI(100000, 12, 12);
    expect(result.emi).toBeCloseTo(8884.88, 1);
    expect(result.totalAmount).toBeCloseTo(106618.58, 0);
    expect(result.totalInterest).toBeCloseTo(6618.58, 0);
  });
  it("throws on zero principal", () => {
    expect(() => calculateEMI(0, 12, 12)).toThrow();
  });
  it("throws on zero tenure", () => {
    expect(() => calculateEMI(100000, 12, 0)).toThrow();
  });
});

// ── SIP ──────────────────────────────────────────────────────────────────────
describe("calculateSIP", () => {
  it("calculates correct SIP maturity", () => {
    const result = calculateSIP(5000, 12, 5);
    expect(result.investedAmount).toBe(300000);
    expect(result.maturityValue).toBeGreaterThan(300000);
  });
  it("throws on zero investment", () => {
    expect(() => calculateSIP(0, 12, 5)).toThrow();
  });
});

// ── Compound Interest ─────────────────────────────────────────────────────────
describe("calculateCompoundInterest", () => {
  it("calculates annual compounding correctly", () => {
    const result = calculateCompoundInterest(10000, 10, 3, 1);
    expect(result.totalAmount).toBeCloseTo(13310, 0);
    expect(result.interest).toBeCloseTo(3310, 0);
  });
  it("calculates quarterly compounding", () => {
    // CI = 10000 * (1 + 0.10/4)^(4*1) = 10000 * (1.025)^4 ≈ 11038.13
    const result = calculateCompoundInterest(10000, 10, 1, 4);
    expect(result.totalAmount).toBeCloseTo(11038.13, 1);
  });
});

// ── GST ──────────────────────────────────────────────────────────────────────
describe("calculateGST", () => {
  it("adds 18% GST correctly", () => {
    const r = calculateGST(1000, 18, "add");
    expect(r.totalAmount).toBe(1180);
    expect(r.gstAmount).toBe(180);
    expect(r.cgst).toBe(90);
  });
  it("removes 18% GST correctly", () => {
    const r = calculateGST(1180, 18, "remove");
    expect(r.baseAmount).toBeCloseTo(1000, 0);
  });
});

// ── Discount ─────────────────────────────────────────────────────────────────
describe("calculateDiscount", () => {
  it("calculates 20% discount correctly", () => {
    const r = calculateDiscount(500, 20);
    expect(r.finalPrice).toBe(400);
    expect(r.savings).toBe(100);
  });
  it("throws on discount > 100%", () => {
    expect(() => calculateDiscount(500, 110)).toThrow();
  });
});

// ── Percentage ────────────────────────────────────────────────────────────────
describe("Percentage functions", () => {
  it("calculatePercentage: 50 of 200 = 25%", () => {
    expect(calculatePercentage(50, 200)).toBe(25);
  });
  it("percentageOf: 20% of 500 = 100", () => {
    expect(percentageOf(20, 500)).toBe(100);
  });
  it("percentageChange: 100 → 150 = +50%", () => {
    expect(percentageChange(100, 150)).toBe(50);
  });
  it("throws on zero total", () => {
    expect(() => calculatePercentage(50, 0)).toThrow();
  });
});

// ── Age ───────────────────────────────────────────────────────────────────────
describe("calculateAge", () => {
  it("returns correct age", () => {
    const birth = new Date("2000-01-15");
    const ref = new Date("2025-06-15");
    const r = calculateAge(birth, ref);
    expect(r.years).toBe(25);
    expect(r.months).toBe(5);
  });
  it("throws for future birth date", () => {
    expect(() => calculateAge(new Date("2099-01-01"))).toThrow();
  });
});

// ── Date Difference ────────────────────────────────────────────────────────
describe("calculateDateDifference", () => {
  it("returns 365 days for one year", () => {
    const a = new Date("2024-01-01");
    const b = new Date("2025-01-01");
    const r = calculateDateDifference(a, b);
    expect(r.days).toBe(366); // 2024 is a leap year
  });
});

// ── BMI ────────────────────────────────────────────────────────────────────
describe("calculateBMI", () => {
  it("Normal BMI: 70kg, 175cm", () => {
    const r = calculateBMI(70, 175);
    expect(r.bmi).toBeCloseTo(22.9, 1);
    expect(r.category).toBe("Normal weight");
  });
  it("Obese: 100kg, 165cm", () => {
    const r = calculateBMI(100, 165);
    expect(r.category).toBe("Obese");
  });
  it("throws on zero height", () => {
    expect(() => calculateBMI(70, 0)).toThrow();
  });
});

// ── TDEE ────────────────────────────────────────────────────────────────────
describe("calculateTDEE", () => {
  it("male sedentary: returns positive bmr and tdee", () => {
    const r = calculateTDEE(70, 175, 25, "male", "sedentary");
    expect(r.bmr).toBeGreaterThan(0);
    expect(r.tdee).toBeGreaterThan(r.bmr);
  });
});

// ── Attendance ────────────────────────────────────────────────────────────
describe("calculateAttendance", () => {
  it("calculates 75% attendance", () => {
    const r = calculateAttendance(75, 100);
    expect(r.percentage).toBe(75);
  });
  it("required75 classes when below 75%", () => {
    const r = calculateAttendance(60, 100);
    expect(r.required75).toBeGreaterThan(0);
  });
  it("throws on invalid attended", () => {
    expect(() => calculateAttendance(-1, 100)).toThrow();
  });
});

// ── CGPA ─────────────────────────────────────────────────────────────────────
describe("calculateCGPA", () => {
  it("weighted average of subjects", () => {
    const r = calculateCGPA([
      { credits: 4, grade: 9 },
      { credits: 3, grade: 8 },
    ]);
    expect(r.cgpa).toBeCloseTo(8.57, 1);
  });
  it("throws on empty subjects", () => {
    expect(() => calculateCGPA([])).toThrow();
  });
});

// ── Length Converter ─────────────────────────────────────────────────────────
describe("convertLength", () => {
  it("1 km = 1000 m", () => expect(convertLength(1, "km", "m")).toBe(1000));
  it("1 mile ≈ 1.60934 km", () => expect(convertLength(1, "mile", "km")).toBeCloseTo(1.60934, 4));
  it("12 inches = 1 foot", () => expect(convertLength(12, "inch", "foot")).toBeCloseTo(1, 4));
});

// ── Weight Converter ─────────────────────────────────────────────────────────
describe("convertWeight", () => {
  it("1 kg = 1000 g", () => expect(convertWeight(1, "kg", "g")).toBe(1000));
  it("1 lb ≈ 453.59 g", () => expect(convertWeight(1, "lb", "g")).toBeCloseTo(453.592, 2));
});

// ── Temperature Converter ─────────────────────────────────────────────────────
describe("convertTemperature", () => {
  it("0°C = 32°F", () => expect(convertTemperature(0, "C", "F")).toBe(32));
  it("100°C = 373.15 K", () => expect(convertTemperature(100, "C", "K")).toBeCloseTo(373.15, 2));
  it("32°F = 0°C", () => expect(convertTemperature(32, "F", "C")).toBeCloseTo(0, 4));
});

// ── Word Counter ─────────────────────────────────────────────────────────────
describe("countWords", () => {
  it("counts words correctly", () => {
    const r = countWords("Hello world, how are you?");
    expect(r.words).toBe(5);
  });
  it("empty string returns zeros", () => {
    const r = countWords("");
    expect(r.words).toBe(0);
  });
});

// ── Base64 ────────────────────────────────────────────────────────────────────
describe("Base64", () => {
  it("encode and decode roundtrip", () => {
    const original = "Hello, Calcify!";
    const encoded = encodeBase64(original);
    expect(decodeBase64(encoded)).toBe(original);
  });
  it("throws on invalid base64", () => {
    expect(() => decodeBase64("!!!invalid!!!")).toThrow();
  });
});

// ── JSON ──────────────────────────────────────────────────────────────────────
describe("JSON formatter", () => {
  it("formats JSON correctly", () => {
    const r = formatJSON('{"a":1,"b":2}', 2);
    expect(r).toContain("\n");
  });
  it("throws on invalid JSON", () => {
    expect(() => formatJSON("not json")).toThrow();
  });
  it("minifies JSON", () => {
    const r = minifyJSON('{ "a" : 1 }');
    expect(r).toBe('{"a":1}');
  });
});
