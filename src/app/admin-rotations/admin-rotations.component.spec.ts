import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRotationsComponent } from './admin-rotations.component';

describe('AdminRotationsComponent', () => {
  let component: AdminRotationsComponent;
  let fixture: ComponentFixture<AdminRotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRotationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
