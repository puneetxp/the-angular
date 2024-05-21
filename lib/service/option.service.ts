import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface options {
  key: string, value: string | number
}
@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor() { }
  SelectObservable(data: Observable<any>, key: string = "id", value: string | number = "name") {
    return data.pipe(map((i: any) => i.map((r: any) => ({ key: r[key], value: r[value] }))));
  }
  SelectOptions(data: any[], key: string = "id", value: string | number = "name"): any[] {
    return data.map((i: any) => ({ key: i[key], value: i[value] }));
  }
}