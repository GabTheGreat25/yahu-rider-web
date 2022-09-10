import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { IDataHeader } from "src/app/interfaces";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @Input() headers: IDataHeader[] = [];
  @Input() isEdit: boolean = false;
  @Input() isDelete: boolean = false;
  @Input() rows: any[] = [];
  @Input() paginations: string[] = [];
  @Input() pageWidth: number = 3;
  @Output() pageClick = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() buttonClick = new EventEmitter<any>();
  @Output() detail = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onPageClick(page: string) {
    this.pageClick.emit(page);
  }

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }
  onButtonClick(event: any) {
    this.buttonClick.emit(event);
  }

  onDetail(e: any, row: any) {
    if (e.target.tagName.toLowerCase() !== "button" && e.target.tagName.toLowerCase() !== "em") this.detail.emit(row);
  }
}
