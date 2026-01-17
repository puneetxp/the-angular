export interface MenuAction {
    route: string;
    label: string;
    name?: string;
    icon?: string;
    contextParam?: string;
}

export interface Menu {
    route: string,
    name: string,
    label: string,
    icon?: string,
    group?: string,
    child?: Menu[],
    links?: Menu[],
    add?: number,
    actions?: MenuAction[]
}