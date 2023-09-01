import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { Profil } from 'src/app/models/profil';
import { profileService } from 'src/app/services/profile.service';
import { DynamicService } from '../../dynamic.service';
import { DynamicSortableHeader, SortEvent } from '../../DynamicSortable.directive';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-profile-liste',
  templateUrl: './profile-liste.component.html',
  styleUrls: ['./profile-liste.component.css'],
  providers: [
	{ provide: 'dataService', useClass: profileService }, // Provide the dataService using 'dataService' token
	DynamicService,
	DecimalPipe
	]
})
export class ProfileListeComponent {
  	profiles$!: Observable<Profil[]>;
	total$!: Observable<number>;
	hasData$!: Observable<boolean>;

	@ViewChildren(DynamicSortableHeader)
  	headers!: QueryList<DynamicSortableHeader>;

	constructor(
		public service: DynamicService<Profil>,
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
	openDialog(profile: Profil): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			data: profile,
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
		this.profiles$ = this.service.data$;
		this.total$ = this.service.total$;
		this.hasData$ = this.profiles$.pipe(map(profiles => profiles.length > 0));
		this.service.triggerSearch();
	}
}
