import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TABLE_PAGINATION_CONFIGS } from "../../../environments/environment";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  // @Input() paginationConfig;
  // @Input() paginationId;
  // @Input() paginationClass;
  // @Output() onPaginationChange: EventEmitter<any> = new EventEmitter<any>();
  // @Output() pageChange: EventEmitter<number>;
  // @Output() pageBoundsCorrection: EventEmitter<number>;
  config = TABLE_PAGINATION_CONFIGS;

  constructor() { }

  ngOnInit(): void {
  }

}
