import { Injectable, NgZone, Type } from "@angular/core";
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from "@angular/router";
import { merge, Observable, of, Subject } from "rxjs";
import { filter, map, startWith, switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReuseStateService {
  private componentTypeSubject$ = new Subject<Type<any>>();
  componentType$ = this.componentTypeSubject$.asObservable();

  constructor(private ngZone: NgZone) {}

  emitComponentType(future: ActivatedRouteSnapshot): void {
    const compType = future?.routeConfig?.component;
    compType && this.componentTypeSubject$.next(compType);
  }

  getVisibility$(component: any): Observable<boolean> {
    return this.componentType$.pipe(
      filter(compType => compType.name === (component as any).constructor.name),
      switchMap(() => merge(
        of(false),
        this.ngZone.onStable.pipe(
          map(() => true),
          take(1)
        )
      )),
      startWith(true)
    );
  }
}

@Injectable()
export class CustomRouterReuseStragegy extends BaseRouteReuseStrategy {

  constructor(private resue: ReuseStateService) {
    super();
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    this.resue.emitComponentType(future);
    return super.shouldReuseRoute(future, curr);
  }
}
