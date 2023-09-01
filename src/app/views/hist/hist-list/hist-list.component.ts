import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HistGesaur } from 'src/app/models/histgesaur';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { DynamicService } from '../../dynamic.service';
import { ModalComponent } from '../modal/modal.component';
import { HistService } from 'src/app/services/hist.service';

@Component({
  selector: 'app-hist-list',
  templateUrl: './hist-list.component.html',
  styleUrls: ['./hist-list.component.css'],
  providers: [
		{ provide: 'dataService', useClass: HistService },
    DecimalPipe,
    DynamicService
  ]
})
export class HistListComponent {
  hists$!: Observable<HistGesaur[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;

	@ViewChildren(DynamicSortableHeader)
  	headers!: QueryList<DynamicSortableHeader>;
    constructor(
      public service: DynamicService<HistGesaur>,
      public dialog: MatDialog,
    ) {
    }
    ngOnInit(): void{
      this.getData();
      console.log(this.hists$)
    }
    onSort({ column, direction }: SortEvent) {
      this.headers.forEach((header) => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      this.service.sortColumn = column;
      this.service.sortDirection = direction;
    }
    getData() {
      this.hists$ = this.service.data$;
      this.total$ = this.service.total$;
      this.hasData$ = this.hists$.pipe(map(hists => hists.length > 0));
		  this.service.triggerSearch()

    }
    openDialog(hist:HistGesaur): void {
      	let dialogRef = this.dialog.open(ModalComponent, {
      		data: hist,
      		width: '80%',
      		height: '80%',
      		autoFocus: false
      	});
      	dialogRef.afterClosed().subscribe(result => {
      		this.service.refreshData();
      		this.getData();
      	});
      }
}
