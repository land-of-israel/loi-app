export interface PassageRow {
  id: number;
  loi_id: string;
  title: string;
  text: string;
  author: string;
  workTitle: string;
  keywords: string;
}

export interface WorkRow {
    id:         number;
    loi_id: string;
    title:      string;
    author:     string;
    tpq:       string;
    taq:       string;
    place:      string;
    passages:   string;
}

export interface KeywordRow {
    id:         number;
    label:   string;
}

export interface AuthorRow {
    id:         number;
    loi_id: string;
    name:   string;
    works: string;
}

