import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchMenuComponent } from './switch-menu.component';

describe('SwitchMenuComponent', () => {
  let component: SwitchMenuComponent;
  let fixture: ComponentFixture<SwitchMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
