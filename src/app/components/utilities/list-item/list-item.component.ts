import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IDataHeader } from "src/app/interfaces";

@Component({
  selector: "list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.scss"],
})
export class ListItemComponent implements OnInit {
  @Input() header!: IDataHeader;
  @Input() row: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() button = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onButtonClick(field: any) {
    this.button.emit(field);
  }

  getFormatedDate(date: Date) {
    return new DatePipe("en-US").transform(date, "MM/dd/yyyy");
  }
}
