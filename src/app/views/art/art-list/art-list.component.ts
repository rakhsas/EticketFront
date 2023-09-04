import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Art } from 'src/app/models/art';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { artService } from 'src/app/services/art.service';
import { DynamicService } from '../../dynamic.service';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css'],
  providers: [
	{ provide: 'dataService', useClass: artService }, // Provide the dataService using 'dataService' token
	DynamicService,
	DecimalPipe
	]
})
export class ArtListComponent {
  arts$!: Observable<Art[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;

	@ViewChildren(DynamicSortableHeader)
  	headers!: QueryList<DynamicSortableHeader>;

	constructor(
		public service: DynamicService<Art>,
		public dialog: MatDialog,
	) {
	}
	ngOnInit(): void{
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
	openDialog(art: Art): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			data: art,
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
		this.arts$ = this.service.data$;
		this.total$ = this.service.total$;
		this.hasData$ = this.arts$.pipe(map(arts => arts.length > 0));
		this.service.triggerSearch()
	}
}
