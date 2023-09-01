import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { DynamicService } from '../../dynamic.service';
@Component({
	selector: 'users-list',
	templateUrl: './UsersList.component.html',
	styleUrls: ['./UsersList.component.css'],
	providers: [
		{ provide: 'dataService', useClass: UserService },
		DecimalPipe,
		DynamicService
	]
})

export class UsersListComponent {
	users$!: Observable<User[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;

	@ViewChildren(DynamicSortableHeader)
	headers!: QueryList<DynamicSortableHeader>;

	constructor(
		public service: DynamicService<User>,
		public dialog: MatDialog,
	) {
	}
	ngOnInit(): void {
		this.getData();

		// check is data being emitting
		// this.users$.subscribe(users => console.log('Fetched users:', users));
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
	openDialog(user: User): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			data: user,
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
		this.users$ = this.service.data$;
		this.total$ = this.service.total$;
		this.hasData$ = this.users$.pipe(map(users => users.length > 0));
		this.service.triggerSearch()
		console.log(this.users$)
	}
}