import { Component, QueryList, ViewChildren } from '@angular/core';
import { Departement } from 'src/app/models/departement';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DecimalPipe } from '@angular/common';
import { departementService } from 'src/app/services/departement.service';
import { DynamicService } from '../../dynamic.service';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'departement-list',
  templateUrl: './Departement.component.html',
  styleUrls: ['./Departement.component.css'],
  providers: [
	{ provide: 'dataService', useClass: departementService }, // Provide the dataService using 'dataService' token
	DynamicService,
	DecimalPipe
]
})
export class DepartementList {
  	departements$!: Observable<Departement[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;

	@ViewChildren(DynamicSortableHeader)
  	headers!: QueryList<DynamicSortableHeader>;

	constructor(
		public service: DynamicService<Departement>,
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
	openDialog(departement:Departement): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			data: departement,
			width: '80%',
			height: '80%',
			autoFocus: false
		});
		dialogRef.afterClosed().subscribe(result => {
			this.service.refreshData();
			this.getData();
		});
	}
	showRow(departement:Departement): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			data: departement,
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
		this.departements$ = this.service.data$;
		this.total$ = this.service.total$;
		this.hasData$ = this.departements$.pipe(map(departements => departements.length > 0));
		this.service.triggerSearch()
		this.departements$.subscribe( t => {
			// console.log(t);
		})
	}
}
