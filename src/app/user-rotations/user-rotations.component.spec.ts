import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRotationsComponent } from './user-rotations.component';

describe('UserRotationsComponent', () => {
  let component: UserRotationsComponent;
  let fixture: ComponentFixture<UserRotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRotationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
