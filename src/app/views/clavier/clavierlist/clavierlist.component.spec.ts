import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClavierlistComponent } from './clavierlist.component';

describe('ClavierlistComponent', () => {
  let component: ClavierlistComponent;
  let fixture: ComponentFixture<ClavierlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClavierlistComponent]
    });
    fixture = TestBed.createComponent(ClavierlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
