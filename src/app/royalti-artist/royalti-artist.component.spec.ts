import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoyaltiArtistComponent } from './royalti-artist.component';

describe('RoyaltiArtistComponent', () => {
  let component: RoyaltiArtistComponent;
  let fixture: ComponentFixture<RoyaltiArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoyaltiArtistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoyaltiArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
