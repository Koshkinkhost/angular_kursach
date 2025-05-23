export interface RotationApplication {
    applicationId: number;
    trackTitle: string;
    artistName: string;
    radioStationName: string;
    radioStationId?:number,
    trackId?:number,
    status: string;
    applicationDate: string;
    reviewDate: string | null;
    notes: string | null;
  }