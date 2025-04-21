export interface EditTracks {
    trackId: number;
    title: string;
    trackArtist: string;
    genreTrack: string;
    AlbumId:number,
    listenersCount: number;
    isEditing?: boolean; // <-- Добавили
  }