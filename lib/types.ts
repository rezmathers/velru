export interface HeroContentItem {
  id: string;
  listItemHeadline: string;
  listItemDescription: string;
  listItemImage: string; // Add the new image field here
  expandedContent: {
    problem: string;
    solutionHeadline: string;
    solutionDescription: string;
    image: string;
    altText: string;
  };
}