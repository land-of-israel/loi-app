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
