export interface EditTracks {
  ArtistId?:number,
    trackId?: number|null;
    title: string;
    trackArtist?: string;
    genreTrack: string;
    AlbumId:number|null,
    listenersCount: number;
    isEditing?: boolean; // <-- Добавили
    audioUrl?: string | null; // URL аудиофайла (если есть)
    FileBase64?: string | null; // Bas
  }