// src/app/api-urls.ts
export const API_URLS = {
    BASE_URL: "http://localhost:8082/api/v2/Account",
    REGISTRATION: "/Registration",
    LOGIN: "/Login",

    CHECK_ADMIN: "/CheckRights",
    CHECK_ROLE: "/GetUserRole",
    NEWS: "http://localhost:8082/api/v2/News/GetNews",
    STUDIOS:"http://localhost:8082/api/v2/Studios/GetAllStudios",
    ADD_STUDIOS:"http://localhost:8082/api/v2/Studios/AddStudio",
    TOP_TRACKS:"http://localhost:8082/api/v2/Track/GetTopTracks",
    ARTIST_TRACKS:"http://localhost:8082/api/v2/Artist/GetTracksArtist",
    ALL_TRACKS:"http://localhost:8082/api/v2/Track/GetAllTracks",
    INCREASE_PLAYS:"http://localhost:8082/api/v2/Track/IncrementListens",
    TRACKS_BY_TITLE:"http://localhost:8082/api/v2/Track/GetTracksByTitle",
    LOGIN_ADMIN: "http://localhost:8082/api/v2/Account/LoginAdmin",
    LOG_OUT:"http://localhost:8082/api/v2/Account/LogOut",
    UPDATE_TRACK:"http://localhost:8082/api/v2/Track/UpdateTrack",
    GET_ALL_ROYALTY:"http://localhost:8082/api/v2/Royalti/GetTotalMoney",
    MONEY_BY_TRACK:"http://localhost:8082/api/v2/Royalti/GetTracksRoyalti",
    ADD_TRACK:"http://localhost:8082/api/v2/Track/UploadTrack",
    RADIOS:"http://localhost:8082/api/v2/Radio/GetAllRadioStations",
    ROTATION_APPLICATIONS:"http://localhost:8082/api/v2/Artist/GetRotations",
    ALL_ALBUMS:"http://localhost:8082/api/v2/Album/GetAllAlbums",
    GET_ALL_ROYALTY_ARTIST:"http://localhost:8082/api/v2/Admin/GetAllArtistsIncome",
    ADD_ROTATION:"http://localhost:8082/api/v2/Radio/AddRotation",
    ALL_ROTATIONS:"http://localhost:8082/api/v2/Radio/GetAllRotations",
    UPDATE_APPLICATION:"http://localhost:8082/api/v2/Radio/UpdateStatus",
    GET_ALBUM_TRACKS:"http://localhost:8082/api/v2/Album/GetTracksALbum",
    ADD_ALBUM_WITH_TRACKS:"http://localhost:8082/api/v2/Album/AddAlbumWithTracks"
  };
  