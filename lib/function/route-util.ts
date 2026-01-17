// route-utils.ts
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

export function subscribeToDeepestParams(
  route: ActivatedRoute,
  callback: (params: Params) => void
): Subscription {
  let lastRoute = route;
  while (lastRoute.firstChild) {
    lastRoute = lastRoute.firstChild;
  }
  return lastRoute.params.subscribe(callback);
}
