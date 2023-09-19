import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { DynamicService } from '../../dynamic.service';
import { EncaissementService } from 'src/app/services/encaissement.service';
import { encaissement } from 'src/app/models/encaissement';
import { Observable, map } from 'rxjs';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
		{ provide: 'dataService', useClass: EncaissementService },
		DecimalPipe,
		DynamicService
	]
})
export class ListComponent {
  encaissements$!: Observable<encaissement[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;
	isCollapsed: boolean[] = [];

	@ViewChildren(DynamicSortableHeader)
	headers!: QueryList<DynamicSortableHeader>;
	toggleCollapse(index: number) {
		this.isCollapsed[index] = !this.isCollapsed[index];
	}
  constructor(
		public service: DynamicService<encaissement>,
		public dialog: MatDialog,

	) {
	}
  ngOnInit(): void {
		this.getData();

		// check is data being emitting
		// this.users$.subscribe(users => // console.log('Fetched users:', users));
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
  openDialog(encaissement: encaissement): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			data: encaissement,
			width: '80%',
			height: '80%',
			autoFocus: false
		});
		dialogRef.afterClosed().subscribe(result => {
			this.service.refreshData();
			this.getData();
		});
	}
  getData() {
		this.encaissements$ = this.service.data$;
		this.total$ = this.service.total$;
		this.hasData$ = this.encaissements$.pipe(map(users => users.length > 0));
		this.service.triggerSearch()
		this.encaissements$.subscribe(users => {
			this.isCollapsed = Array(users.length).fill(false);
		});
	}
}
