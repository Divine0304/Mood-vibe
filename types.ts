
export interface Song {
  titre: string;
  artiste: string;
  annee: string;
  explication_courte: string;
}

export interface MoodRecommendation {
  analyse: string;
  message_bienveillant: string;
  genre: string;
  playlist: Song[];
}

export type ThemeType = 'neon' | 'pastel';

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
