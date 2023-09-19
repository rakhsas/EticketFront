import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { clientService } from 'src/app/services/client.service';
import { DynamicService } from '../../dynamic.service';
import { client } from 'src/app/models/client';
import { Observable, map } from 'rxjs';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
		{ provide: 'dataService', useClass: clientService }, // Provide the dataService using 'dataService' token
		DynamicService,
		DecimalPipe
	]
})
export class ListComponent {
  clients$!: Observable<client[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;
	id: Number = 0;
  @ViewChildren(DynamicSortableHeader)
	headers!: QueryList<DynamicSortableHeader>;

  constructor(
		public service: DynamicService<client>,
		public dialog: MatDialog,
	) {
	}
  ngOnInit(): void {
		this.getData();
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
  onPageChange(page: number) {
		this.service.page = page;
		// this.service.triggerSearch(); // Trigger search when pagination changes
	}
  // openDialog(departement:Departement): void {
	// 	let dialogRef = this.dialog.open(ModalComponent, {
	// 		data: departement,
	// 		width: '80%',
	// 		height: '80%',
	// 		autoFocus: false
	// 	});
	// 	dialogRef.afterClosed().subscribe(result => {
	// 		this.service.refreshData();
	// 		this.getData();
	// 	});
	// }
  getData() {
		this.clients$ = this.service.data$;
		this.total$ = this.service.total$;
		this.hasData$ = this.clients$.pipe(map(items => items.length > 0));
		this.service.triggerSearch();
		this.clients$.subscribe(
			m => console.log(m)
		)

	}
}
