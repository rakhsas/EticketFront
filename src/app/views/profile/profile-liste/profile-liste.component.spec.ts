import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListeComponent } from './profile-liste.component';

describe('ProfileListeComponent', () => {
  let component: ProfileListeComponent;
  let fixture: ComponentFixture<ProfileListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileListeComponent]
    });
    fixture = TestBed.createComponent(ProfileListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
