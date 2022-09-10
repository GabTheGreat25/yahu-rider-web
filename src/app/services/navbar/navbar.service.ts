import { Injectable } from "@angular/core";
import { NavTab } from "@app/interfaces";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class NavbarService {
  private _tabs = new BehaviorSubject<NavTab[]>([]);
  private _onInit = new BehaviorSubject<boolean>(false);
  tabs = this._tabs.asObservable();
  onInit = this._onInit.asObservable();

  init(tabs: NavTab[]): Observable<NavTab[]> {
    this._tabs.next(tabs);
    return this.tabs;
  }

  addTab(tab: NavTab) {
    const value = this._tabs.getValue();
    this._tabs.next([...value, tab]);
  }

  reset(tabs: NavTab[] = []) {
    this._tabs.next(tabs);
  }
}
