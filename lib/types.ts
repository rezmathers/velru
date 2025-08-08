export interface HeroContentItem {
  id: string;
  listItemHeadline: string;
  listItemDescription: string;
  listItemImage: string; // Add the new image field here

  
  highlighterImage: string;
  expandedContent: {
    problem: string;
    problemHeadline: string; // Add this new field
    solutionHeadline: string;
    solutionDescription: string;
    video: string;
    cta1: string; // Add cta1
    cta2: string; // Add cta2
    image: string;
    altText: string;
  };
}