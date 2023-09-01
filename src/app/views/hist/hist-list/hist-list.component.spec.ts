import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistListComponent } from './hist-list.component';

describe('HistListComponent', () => {
  let component: HistListComponent;
  let fixture: ComponentFixture<HistListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistListComponent]
    });
    fixture = TestBed.createComponent(HistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
