export interface Menu {
    route: string,
    name: string,
    label: string,
    child?: Menu[],
    links?: Menu[]
}