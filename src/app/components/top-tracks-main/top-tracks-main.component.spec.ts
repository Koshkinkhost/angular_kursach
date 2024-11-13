import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTracksMainComponent } from './top-tracks-main.component';

describe('TopTracksMainComponent', () => {
  let component: TopTracksMainComponent;
  let fixture: ComponentFixture<TopTracksMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTracksMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTracksMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
