import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: any[] = [];
  buttonName = "";
  previousRoute = "";
  @Input() route = "";
  @Input() canAdd = false;
  @Input() statusList: string[] = [];
  @Output() statusChange = new EventEmitter<any>();

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.checkUrl(val.url.replace("/", "").split("/"));
        const hasAdd = val.url.includes("add");
        const hasEdit = val.url.includes("edit");
        this.buttonName = hasAdd || hasEdit ? "Back" : "Add " + this.route;
      }
    });
  }

  ngOnInit(): void {
    this.checkUrl(this.router.url.replace("/", "").split("/"));
  }

  optionChange(value: string) {
    this.statusChange.emit(value);
  }

  checkUrl(url: string[]) {
    let prev = "";
    this.breadcrumbs = url.map((route) => {
      prev += `/${route}`;
      return {
        route: prev,
        name: route[0].toLocaleUpperCase() + route.slice(1, route.length),
      };
    });
  }

  navigateTo(value: string) {
    if (this.buttonName.includes("Back")) {
      this.router.navigate([this.previousRoute]);
      return;
    }

    this.previousRoute = this.router.url;
    this.router.navigate([this.previousRoute + `/${value}`]);
  }
}
