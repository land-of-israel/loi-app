import type {Navigation, AuthorRef} from "$lib/types/common"


export interface Work {
    loi_id:     string;
    id:         number;
    title:      string;
    author:     AuthorRef[];
    date:       DateElement[];
    place:      Place[];
    language:   string;
    passages:   Passage[];
    view_label: string;
    prev:       Navigation;
    next:       Navigation;
}


export interface DateElement {
    tpq:   string;
    taq:   string;
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