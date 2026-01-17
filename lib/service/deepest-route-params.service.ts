// services/deepest-route-params.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeepestRouteParamsService {
  getDeepestParams(route: ActivatedRoute): Observable<any> {
    let lastRoute = route;
    while (lastRoute.firstChild) {
      lastRoute = lastRoute.firstChild;
    }
    return lastRoute.params;
  }

  getDeepestQueryParams(route: ActivatedRoute): Observable<any> {
    let lastRoute = route;
    while (lastRoute.firstChild) {
      lastRoute = lastRoute.firstChild;
    }
    return lastRoute.queryParams;
  }
}
