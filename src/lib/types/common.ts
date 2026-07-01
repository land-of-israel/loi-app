export interface Navigation {
    id:    string;
    label: string;
}

export interface WorkRef {
    loi_id: string;
    title:  string;
    author: AuthorRef[];
}

export interface AuthorRef {
    loi_id: string;
    name:   string;
}
export interface GenreRef {
    loi_id: string;
    sub_genre:  string;
    main_genre: string
}

interface Date {
    tpq: number;
    taq: number;
    label: string
}

export interface PlaceRef {
    loi_id: string;
    name:   string;
    geoname: string;
    wikidata: string
}

export interface WorkFullRef extends WorkRef {
    date: Date[];
    language: string;
    place: PlaceRef[];
    genre: GenreRef[]
}