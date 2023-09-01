import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { DynamicService } from '../../dynamic.service';
import { DecimalPipe } from '@angular/common';
import { Clavier } from 'src/app/models/p_clavier';
import { Observable, firstValueFrom, map, take } from 'rxjs';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { ClavierService } from 'src/app/services/p_clavier.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-clavierlist',
	templateUrl: './clavierlist.component.html',
	styleUrls: ['./clavierlist.component.css'],
	providers: [
		{ provide: 'dataService', useClass: ClavierService }, // Provide the dataService using 'dataService' token
		DynamicService,
		DecimalPipe
	]
})
export class ClavierlistComponent {
	claviers$!: Observable<Clavier[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;
	id: Number = 0;
	@ViewChildren(DynamicSortableHeader)
	headers!: QueryList<DynamicSortableHeader>;

	constructor(
		public service: DynamicService<Clavier>,
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
		this.claviers$ = this.service.data$;
		this.total$ = this.service.total$;
		this.hasData$ = this.claviers$.pipe(map(items => items.length > 0));
		this.service.triggerSearch()

	}
}
