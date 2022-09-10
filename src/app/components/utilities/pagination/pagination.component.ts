import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  @Input() pageWidth = 5;
  @Output() pageClick = new EventEmitter<any>();
  _pagination = ["Back", "Next"];
  selectedPage = 1;

  @Input() set pages(value: any) {
    const pageNumbers = value.slice(0, this.pageWidth);
    this._pagination = ["Back", ...pageNumbers, "Next"];
    this.selectedPage === +this._pagination[1];
  }

  constructor() {}

  ngOnInit(): void {}

  onClick(page: string) {
    const lowerCase = page.toLocaleLowerCase();
    if (lowerCase === "back") {
      this.selectedPage = this.selectedPage === 1 ? this.selectedPage : this.selectedPage - 1;
    }

    if (lowerCase === "next") {
      const lastPage = this._pagination[this._pagination.length - 2];
      this.selectedPage = +lastPage === this.selectedPage ? this.selectedPage : this.selectedPage + 1;
    }

    if (lowerCase !== "back" && lowerCase !== "next") {
      this.selectedPage = +page;
    }

    this.pageClick.emit(this.selectedPage);
  }
}
