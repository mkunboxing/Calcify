import { describe, it, expect } from "vitest";
import {
  calculateSimpleInterest, calculateFD, calculateRD, calculateLumpsum,
  calculateCAGR, calculateROI, calculateProfitMargin, calculateMarkup,
  calculateBreakEven, calculateInflation, calculateCreditCardPayoff,
  calculateSavingsGoal, calculateEmergencyFund, calculateRetirementCorpus,
  calculateStatistics, simplifyRatio, solveProportion, fractionOp,
  checkPrime, factorial, solveQuadratic, permutation, combination,
  pythagorean, addDaysToDate, calculateBMR, calculateIdealWeight,
  calculateRunningPace, calculateWaterIntake, convertCase, generateSlug,
  sortLines, removeDuplicateLines, urlEncode, urlDecode, hexToRgb,
  rgbToHex, convertArea, convertVolume, convertSpeed, convertDataStorage, convertAngle,
} from "../lib/calculations-extended";

describe("Calculations Extended Suite", () => {
  it("Simple Interest: 10000 @ 8% for 5 years = 4000 interest", () => {
    const res = calculateSimpleInterest(10000, 8, 5);
    expect(res.interest).toBe(4000);
    expect(res.totalAmount).toBe(14000);
  });

  it("FD: 100000 @ 7.5% for 5 years quarterly", () => {
    const res = calculateFD(100000, 7.5, 5, 4);
    expect(res.maturityAmount).toBeGreaterThan(140000);
  });

  it("CAGR: 10000 to 25000 in 5 years", () => {
    const cagr = calculateCAGR(10000, 25000, 5);
    expect(cagr).toBeCloseTo(20.11, 1);
  });

  it("ROI: 50000 -> 75000 = 50% ROI", () => {
    const res = calculateROI(50000, 75000);
    expect(res.roi).toBe(50);
    expect(res.netProfit).toBe(25000);
  });

  it("Profit Margin: 100000 rev, 65000 cost = 35% margin", () => {
    const res = calculateProfitMargin(100000, 65000);
    expect(res.margin).toBe(35);
    expect(res.grossProfit).toBe(35000);
  });

  it("Break-even: 100000 fixed, 500 sell, 300 variable = 500 units", () => {
    const res = calculateBreakEven(100000, 500, 300);
    expect(res.breakEvenUnits).toBe(500);
    expect(res.breakEvenRevenue).toBe(250000);
  });

  it("Statistics: Mean, median of [12, 15, 18, 22, 22, 25, 30]", () => {
    const res = calculateStatistics([12, 15, 18, 22, 22, 25, 30]);
    expect(res.mean).toBeCloseTo(20.57, 1);
    expect(res.median).toBe(22);
    expect(res.mode).toEqual([22]);
  });

  it("Ratio simplification: 12 : 18 -> 2 : 3", () => {
    const res = simplifyRatio(12, 18);
    expect(res).toEqual({ a: 2, b: 3 });
  });

  it("Proportion solver: 4/5 = 20/X -> X = 25", () => {
    expect(solveProportion(4, 5, 20)).toBe(25);
  });

  it("Fraction addition: 3/4 + 2/5 = 23/20", () => {
    const res = fractionOp({ num: 3, den: 4 }, { num: 2, den: 5 }, "+");
    expect(res).toEqual({ num: 23, den: 20 });
  });

  it("Prime Checker: 29 is prime", () => {
    expect(checkPrime(29).isPrime).toBe(true);
    expect(checkPrime(30).isPrime).toBe(false);
  });

  it("Factorial: 5! = 120", () => {
    expect(factorial(5).toString()).toBe("120");
  });

  it("Quadratic: x^2 - 5x + 6 = 0 -> roots 3, 2", () => {
    const res = solveQuadratic(1, -5, 6);
    expect(res.roots).toEqual([3, 2]);
  });

  it("Permutation: 5P2 = 20", () => {
    expect(permutation(5, 2)).toBe(20);
  });

  it("Combination: 5C2 = 10", () => {
    expect(combination(5, 2)).toBe(10);
  });

  it("Pythagorean: 3, 4 -> c = 5", () => {
    expect(pythagorean(3, 4, null)).toBe(5);
  });

  it("BMR: male 70kg 175cm 25yo", () => {
    expect(calculateBMR(70, 175, 25, "male")).toBeGreaterThan(1600);
  });

  it("Case converter: upper, camel, kebab", () => {
    expect(convertCase("hello world", "upper")).toBe("HELLO WORLD");
    expect(convertCase("hello world", "kebab")).toBe("hello-world");
  });

  it("Slug generator: 'Hello World! 2026' -> 'hello-world-2026'", () => {
    expect(generateSlug("Hello World! 2026")).toBe("hello-world-2026");
  });

  it("URL Encode / Decode roundtrip", () => {
    const orig = "https://example.com/test?a=1&b=2";
    expect(urlDecode(urlEncode(orig))).toBe(orig);
  });

  it("Color converter: hex to rgb", () => {
    expect(hexToRgb("#6366f1")).toEqual({ r: 99, g: 102, b: 241 });
    expect(rgbToHex(99, 102, 241)).toBe("#6366f1");
  });

  it("Area converter: 1 acre = 43560 sq ft (approx 4047 sq m)", () => {
    const sqft = convertArea(1, "acre", "sqft");
    expect(sqft).toBeGreaterThan(43000);
  });
});
