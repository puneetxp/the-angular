import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type MenuActionButton = { href: string, icon?: string, label?: string };

@Injectable({
  providedIn: 'root'
})
export class MenuBarService {
 private titleSubject = new BehaviorSubject<string>('');
  private componentSubject = new BehaviorSubject<any>(null);
  private primaryButtonSubject = new BehaviorSubject<MenuActionButton | null>(null);
  private buttonsSubject = new BehaviorSubject<MenuActionButton[]>([]);

  setComponent(component: any) {
    this.componentSubject.next(component);
  }

  setTitle(title: string) {
    this.titleSubject.next(title);
  }

  setActionButton(x: MenuActionButton) {
    const currentButtons = this.buttonsSubject.value;
    this.buttonsSubject.next([...currentButtons, x]);
  }

  setPrimaryActionButton(x: MenuActionButton) {
    this.primaryButtonSubject.next(x);
  }

  resetPrimaryActionButton() {
    this.primaryButtonSubject.next(null);
   }

  resetActionButtons() {
    this.buttonsSubject.next([]);
  }

  getComponent(): Observable<any> {
    return this.componentSubject.asObservable();
  }

  getTitle(): Observable<string> {
    return this.titleSubject.asObservable();
  }

  getPrimaryActionButton(): Observable<MenuActionButton | null> {
    return this.primaryButtonSubject.asObservable();
  }
  getActionButtons(): Observable<MenuActionButton[]> { return this.buttonsSubject.asObservable(); }
}
