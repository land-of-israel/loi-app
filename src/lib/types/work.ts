import type {Navigation, AuthorRef, GenreRef} from "$lib/types/common"


export interface Work {
    loi_id:     string;
    id:         number;
    title:      string;
    author:     AuthorRef[];
    date:       DateElement[];
    place:      Place[];
    language:   string;
    genre:      GenreRef[];
    passages:   Passage[];
    view_label: string;
    prev:       Navigation;
    next:       Navigation;
}


export interface DateElement {
    tpq:   number | undefined;
    taq:   number | undefined;
    label: string;
}

export interface Place {
    loi_id: string;
    name: string;
    geoname: string;
    wikidata: string
}

export interface Passage {
    loi_id:      string;
    title:       string;
    text:        string;
    translation: string;
    keywords:    Keyword[];
}

export interface Keyword {
    loi_id: string;
    value:  string;
}

