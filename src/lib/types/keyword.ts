import type {Navigation, WorkRef} from "$lib/types/common"


export interface Keyword {
    loi_id:     string;
    id: number;
    label:      string;
    view_label: string;
    notes:      string;
    passages:   Passage[];
    prev:       Navigation;
    next:       Navigation;
}

export interface Passage {
    loi_id: string;
    title:  string;
    work:   WorkRef[];
}



