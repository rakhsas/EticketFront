import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Caisse } from 'src/app/models/caisse';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { caisseService } from 'src/app/services/caisse.service';
import { DynamicService } from '../../dynamic.service';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-caisse-list',
  templateUrl: './caisse-list.component.html',
  styleUrls: ['./caisse-list.component.css'],
  providers: [
	{ provide: 'dataService', useClass: caisseService }, // Provide the dataService using 'dataService' token
	DynamicService,
	DecimalPipe
]
})
export class CaisseListComponent {
  caisses$!: Observable<Caisse[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;

	@ViewChildren(DynamicSortableHeader)
  	headers!: QueryList<DynamicSortableHeader>;

	constructor(
		public service: DynamicService<Caisse>,
		public dialog: MatDialog,
	) {
	}
	ngOnInit(): void{
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
	openDialog(caisse: Caisse): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			data: caisse,
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
		this.caisses$ = this.service.data$;
		this.total$ = this.service.total$;
		this.hasData$ = this.caisses$.pipe(map(caisses => caisses.length > 0));
		this.service.triggerSearch()
	}
}
