export interface Story {
  id: number;
  title: string;
  url?: string;
  by: string;
  time: number;
  type?: string;
  score: number;
  domain?: string;
  descendants?: number;
}
