export enum IdeaStage {
  INPUT = 'INPUT',
  EXPANDING = 'EXPANDING',
  VISUALIZING = 'VISUALIZING',
  COMPLETE = 'COMPLETE'
}

export interface IdeaExpansion {
  title: string;
  tagline: string;
  description: string;
  targetAudience: string[];
  keyFeatures: string[];
  potentialChallenges: string[];
  pivotOptions: {
    name: string;
    description: string;
  }[];
}

export interface NexusState {
  seed: string;
  expansion: IdeaExpansion | null;
  imageUrl: string | null;
  stage: IdeaStage;
  error: string | null;
}
