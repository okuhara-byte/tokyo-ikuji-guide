export interface EligibilityOption {
  value: string;
  label: string;
  eligible: boolean;
}

export interface EligibilityQuestion {
  id: string;
  question: string;
  note?: string;
  options: EligibilityOption[];
}

export interface ApplicationStep {
  title: string;
  desc: string;
  documents?: string[];
}

export interface BenefitDetail {
  overview: string;
  amountDetail: string[];
  whoDetail: string;
  deadlineDetail: string;
  eligibilityQuestions: EligibilityQuestion[];
  steps: ApplicationStep[];
  notes?: string[];
}
