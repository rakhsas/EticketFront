import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, Subject, debounceTime, delay, of, switchMap, tap } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { SortColumn, SortDirection } from './DynamicSortable.directive';
import Fuse from 'fuse.js';


interface SearchResult<T> {
	data: T[];
	total: number;
}


interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

type Comparator<T> = (v1: T, v2: T) => number;

function createComparator<T>(propertyType: 'string' | 'number' | 'Date'): Comparator<T> {
	return (v1, v2) => {
		if (propertyType === 'string') {
			return String(v1).localeCompare(String(v2));
		} else if (propertyType === 'number' || propertyType === 'Date') {
			return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
		}
		return 0;
	};
}

function sort<T>(
	items: T[],
	column: keyof T | string, // Allow both keyof T and string
	direction: SortDirection,
	propertyType: 'string' | 'number' | 'Date'
): T[] {
	if (direction === '' || column === '') {
		return items;
	} else {
		const comparator = createComparator<T>(propertyType);
		return [...items].sort((a, b) => {
			const valueA = (a as any)[column]; // Access the property using bracket notation
			const valueB = (b as any)[column]; // Access the property using bracket notation

			const res = comparator(valueA, valueB);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches<T>(item: T, term: string): boolean {
	const searchTerm = term.toLowerCase();
	const keys = Object.keys(item) as Array<keyof T>;

	for (const prop of keys) {
	  let itemValue = item[prop] as unknown as string;

	  if (itemValue !== null && typeof itemValue === 'object') {
		itemValue = JSON.stringify(itemValue);
	  } else if (itemValue !== null) {
		itemValue = String(itemValue);
	  } else {
		continue; // Skip properties with null values
	  }

	  itemValue = itemValue.toLowerCase(); // Convert to lowercase

	  if (itemValue.includes(searchTerm)) {
		return true;
	  }
	}
	return false;
  }




@Injectable({
	providedIn: 'root'
})
export class DynamicService<T> {
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _data$ = new BehaviorSubject<T[]>([]);
	private _total$ = new BehaviorSubject<number>(0);
	DATA: T[] = [];
	private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(
		private http: HttpClient,
		private pipe: DecimalPipe,
		@Inject('dataService') private dataService: any
	) {
		this.dataService.getData().subscribe(
			data => {
				this.DATA = data;
			}
		  );
		  this._search$
		  	.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false))
			).subscribe((result) => {
					this._data$.next(result.data);
					this._total$.next(result.total);
				});
		// this._search$.next();


	}
	refreshData() : void{
		this.dataService.getData().subscribe(
			data => {
				this.DATA = data;
			}
			);
			this._search$.next();
	}
	triggerSearch() {
		this._loading$.next(true);
		this._search$.next();
	}
	get data$(): Observable<T[]> {
		return this._data$.asObservable();
	}

	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult<T>> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
		let propertyType: 'string' | 'number' | 'Date' = 'string'; // Set the default property type
		if (sortColumn === 'numericProperty') {
			propertyType = 'number';
		} else if (sortColumn === 'dateProperty') {
			propertyType = 'Date';
		}
		// 1. sort
		let data = sort(this.DATA, sortColumn, sortDirection, propertyType);
		// // console.log(data.length)
		// 2. filter
		if (searchTerm)
		{
			data = data.filter((item) => {
				const found = matches(item, searchTerm);
				return found;
			  });
		}
		const total = data.length;
		// 3. paginate
		data = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

		return of({ data, total });
	}


}