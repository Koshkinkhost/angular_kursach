import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrokaComponent } from './stroka.component';

describe('StrokaComponent', () => {
  let component: StrokaComponent;
  let fixture: ComponentFixture<StrokaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrokaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrokaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
