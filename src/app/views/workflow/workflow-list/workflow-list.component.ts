import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { Workflow } from 'src/app/models/workflow';
import { DynamicService } from '../../dynamic.service';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { WorkflowService } from 'src/app/services/workflow.service';
import { Departement } from 'src/app/models/departement';
import { ModalComponent } from '../modal/modal.component';

@Component({
	selector: 'app-workflow-list',
	templateUrl: './workflow-list.component.html',
	styleUrls: ['./workflow-list.component.css'],
	providers: [
		{ provide: 'dataService', useClass: WorkflowService },
		DecimalPipe,
		DynamicService
	]
})
export class WorkflowListComponent {
	workflows$!: Observable<Workflow[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;

	@ViewChildren(DynamicSortableHeader)
	headers!: QueryList<DynamicSortableHeader>;

	constructor(
		public service: DynamicService<Workflow>,
		public dialog: MatDialog,
	) {
	}
	ngOnInit(): void {
		this.getData();
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
	openDialog(workflow:Workflow): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			data: workflow,
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
		this.workflows$ = this.service.data$;
		this.total$ = this.service.total$;
		this.hasData$ = this.workflows$.pipe(map(workflows => workflows.length > 0));
		this.service.triggerSearch()
	}
}
