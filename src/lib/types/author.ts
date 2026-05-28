import type {Navigation} from "$lib/types/common"

export interface Author {
    loi_id:     string;
    id:         number;
    name:       string;
    view_label: string;
    works:      Ref[];
    gnd:        string;
    wikidata:   string;
    prev:       Navigation;
    next:       Navigation;
}



export interface Ref {
    loi_id: string;
    title:  string;
}