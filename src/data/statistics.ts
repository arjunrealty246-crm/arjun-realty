export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface TrustBadge {
  label: string;
}

export const heroStats: Stat[] = [
  { value: 5, suffix: "+", label: "Years of Trust" },
  { value: 1000, suffix: "+", label: "Happy Families" },
  { value: 50, suffix: "+", label: "Projects Vetted" },
  { value: 4, suffix: "+", label: "Partner Builders" },
];

export const heroTrustBadges: TrustBadge[] = [
  { label: "HMDA Approved" },
  { label: "DTCP Approved" },
  { label: "RERA Registered" },
  { label: "Zero Brokerage" },
];

export const aboutStats = [
  { value: "5+", label: "Years of Trust" },
  { value: "1000+", label: "Happy Families" },
  { value: "4+", label: "Partner Builders" },
  { value: "50+", label: "Projects Vetted" },
  { value: "10+", label: "Countries Served" },
  { value: "4.9★", label: "Google Rating" },
];

export const growthStats = [
  { label: "IT Exports", value: "8.2%", desc: "Year-on-year growth in IT exports" },
  { label: "GDP Growth", value: "8.2%", desc: "+1.4% YoY" },
  { label: "Job Creation", value: "2.4M+", desc: "New jobs in 5 years" },
  { label: "Appreciation", value: "12–25%", desc: "Annual property appreciation" },
];

export const approvalBadges = ["HMDA", "DTCP", "RERA", "Zero Brokerage", "Free Consultation"];

export const budgetOptions = [
  { label: "Under ₹50 Lakh", value: "under-50" },
  { label: "₹50 Lakh – ₹1 Crore", value: "50l-1cr" },
  { label: "₹1 Crore – ₹2 Crore", value: "1cr-2cr" },
  { label: "₹2 Crore – ₹5 Crore", value: "2cr-5cr" },
  { label: "Above ₹5 Crore", value: "above-5cr" },
];

export const countryOptions = [
  "India", "United Arab Emirates", "United States", "United Kingdom",
  "Singapore", "Canada", "Australia", "Saudi Arabia", "Kuwait", "Qatar",
  "Bahrain", "Oman", "Malaysia", "Other",
];
