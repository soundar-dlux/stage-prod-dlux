export interface SuccessStory {
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
  banner?: {
    url: string;
    description?: string;
  };
  caseStudyPdf?: {
    url: string;
    fileName?: string;
  };
}
