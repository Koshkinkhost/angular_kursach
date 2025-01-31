import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InSystemComponent } from './in-system.component';

describe('InSystemComponent', () => {
  let component: InSystemComponent;
  let fixture: ComponentFixture<InSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
