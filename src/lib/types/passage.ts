import type {Navigation, WorkFullRef} from "$lib/types/common"


export interface Passage {
    id:                 number;
    loi_id:             string;
    title:              string;
    view_label:         string;
    work:               WorkFullRef[];
    text:               string;
    translation:        string;
    german_translation: string;
    bibl_quotes:        BiblQuot[];
    commentary:         string;
    keywords:           Keyword[];
    parallels:      Parallel[];
    prev:               Navigation;
    next:               Navigation;
}

export interface Keyword {
    loi_id: string;
    value:  string;
}

export interface BiblQuot {
    loi_id: string;
    bible: string;
    text: string
}

interface Parallel {
    loi_id: string;
    label: string;
    excerpt: string;
}
