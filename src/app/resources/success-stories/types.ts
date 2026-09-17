export interface Asset {
  url: string;
  title?: string;
  description?: string;
}

export interface CaseStudy {
  title: string;
  slug: string;
  client?: string;
  industry?: string;
  location?: string;
  summary?: string;
  shortDescription?: string;
  challengesBottlenecks?: string;
  turningPoint?: string;
  conclusion?: string;
  tags?: string[] | string;
  banner?: Asset;
  clientLogo?: Asset;
  caseStudyPdf?: {
    url: string;
    fileName?: string;
  };
}

export interface SuccessStoriesData {
  caseStudies: CaseStudy[];
}
