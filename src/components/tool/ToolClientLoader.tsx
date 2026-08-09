"use client";

import dynamic from "next/dynamic";
import { ComponentType, useMemo } from "react";

const componentMap: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  PercentageCalculator: () => import("@/components/tools/PercentageCalculator"),
  EMICalculator: () => import("@/components/tools/EMICalculator"),
  SIPCalculator: () => import("@/components/tools/SIPCalculator"),
  CompoundInterestCalculator: () => import("@/components/tools/CompoundInterestCalculator"),
  SimpleInterestCalculator: () => import("@/components/tools/SimpleInterestCalculator"),
  FDCalculator: () => import("@/components/tools/FDCalculator"),
  RDCalculator: () => import("@/components/tools/RDCalculator"),
  LumpsumCalculator: () => import("@/components/tools/LumpsumCalculator"),
  CAGRCalculator: () => import("@/components/tools/CAGRCalculator"),
  ROICalculator: () => import("@/components/tools/ROICalculator"),
  GSTCalculator: () => import("@/components/tools/GSTCalculator"),
  DiscountCalculator: () => import("@/components/tools/DiscountCalculator"),
  ProfitMarginCalculator: () => import("@/components/tools/ProfitMarginCalculator"),
  MarkupCalculator: () => import("@/components/tools/MarkupCalculator"),
  BreakevenCalculator: () => import("@/components/tools/BreakevenCalculator"),
  InflationCalculator: () => import("@/components/tools/InflationCalculator"),
  CreditCardPayoff: () => import("@/components/tools/CreditCardPayoff"),
  SavingsGoalCalculator: () => import("@/components/tools/SavingsGoalCalculator"),
  EmergencyFundCalculator: () => import("@/components/tools/EmergencyFundCalculator"),
  NetWorthCalculator: () => import("@/components/tools/NetWorthCalculator"),
  RetirementCorpusCalculator: () => import("@/components/tools/RetirementCorpusCalculator"),

  AgeCalculator: () => import("@/components/tools/AgeCalculator"),
  StatisticsCalculator: () => import("@/components/tools/StatisticsCalculator"),
  RatioCalculator: () => import("@/components/tools/RatioCalculator"),
  FractionCalculator: () => import("@/components/tools/FractionCalculator"),
  LCMHCFCalculator: () => import("@/components/tools/LCMHCFCalculator"),
  PrimeChecker: () => import("@/components/tools/PrimeChecker"),
  FactorialCalculator: () => import("@/components/tools/FactorialCalculator"),
  QuadraticSolver: () => import("@/components/tools/QuadraticSolver"),
  PermutationCombination: () => import("@/components/tools/PermutationCombination"),
  PythagoreanCalculator: () => import("@/components/tools/PythagoreanCalculator"),
  RandomNumberGenerator: () => import("@/components/tools/RandomNumberGenerator"),

  DateDifferenceCalculator: () => import("@/components/tools/DateDifferenceCalculator"),
  AddSubtractDays: () => import("@/components/tools/AddSubtractDays"),
  UnixTimestampConverter: () => import("@/components/tools/UnixTimestampConverter"),
  CountdownCalculator: () => import("@/components/tools/CountdownCalculator"),

  BMICalculator: () => import("@/components/tools/BMICalculator"),
  BMRCalculator: () => import("@/components/tools/BMRCalculator"),
  TDEECalculator: () => import("@/components/tools/TDEECalculator"),
  CalorieDeficitCalculator: () => import("@/components/tools/CalorieDeficitCalculator"),
  IdealWeightCalculator: () => import("@/components/tools/IdealWeightCalculator"),
  RunningPaceCalculator: () => import("@/components/tools/RunningPaceCalculator"),
  WaterIntakeCalculator: () => import("@/components/tools/WaterIntakeCalculator"),

  AttendanceCalculator: () => import("@/components/tools/AttendanceCalculator"),
  CGPACalculator: () => import("@/components/tools/CGPACalculator"),

  LengthConverter: () => import("@/components/tools/LengthConverter"),
  WeightConverter: () => import("@/components/tools/WeightConverter"),
  TemperatureConverter: () => import("@/components/tools/TemperatureConverter"),
  AreaConverter: () => import("@/components/tools/AreaConverter"),
  VolumeConverter: () => import("@/components/tools/VolumeConverter"),
  SpeedConverter: () => import("@/components/tools/SpeedConverter"),
  DataStorageConverter: () => import("@/components/tools/DataStorageConverter"),
  AngleConverter: () => import("@/components/tools/AngleConverter"),

  WordCounter: () => import("@/components/tools/WordCounter"),
  CaseConverter: () => import("@/components/tools/CaseConverter"),
  SlugGenerator: () => import("@/components/tools/SlugGenerator"),
  LoremIpsumGenerator: () => import("@/components/tools/LoremIpsumGenerator"),
  RemoveDuplicateLines: () => import("@/components/tools/RemoveDuplicateLines"),
  SortLines: () => import("@/components/tools/SortLines"),
  FindAndReplace: () => import("@/components/tools/FindAndReplace"),

  JSONFormatter: () => import("@/components/tools/JSONFormatter"),
  Base64Tool: () => import("@/components/tools/Base64Tool"),
  URLEncodeDecode: () => import("@/components/tools/URLEncodeDecode"),
  UUIDGenerator: () => import("@/components/tools/UUIDGenerator"),
  HashGenerator: () => import("@/components/tools/HashGenerator"),
  RegexTester: () => import("@/components/tools/RegexTester"),
  ColorConverter: () => import("@/components/tools/ColorConverter"),

  ImageCompressor: () => import("@/components/tools/ImageCompressor"),

  QRCodeGenerator: () => import("@/components/tools/QRCodeGenerator"),
  PasswordGenerator: () => import("@/components/tools/PasswordGenerator"),
  RandomPicker: () => import("@/components/tools/RandomPicker"),
  DiceRoller: () => import("@/components/tools/DiceRoller"),
  CoinFlip: () => import("@/components/tools/CoinFlip"),
};

export default function ToolClientLoader({ componentKey }: { componentKey: string }) {
  const DynamicComp = useMemo(() => {
    const importer = componentMap[componentKey];
    if (!importer) {
      return () => <div className="p-4 text-center text-slate-400">Tool widget coming soon.</div>;
    }
    return dynamic(importer, {
      ssr: false,
      loading: () => <div className="w-full h-48 skeleton rounded-xl" />,
    });
  }, [componentKey]);

  return <DynamicComp />;
}
