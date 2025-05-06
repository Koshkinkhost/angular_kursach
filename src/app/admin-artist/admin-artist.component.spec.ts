import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtistComponent } from './admin-artist.component';

describe('AdminArtistComponent', () => {
  let component: AdminArtistComponent;
  let fixture: ComponentFixture<AdminArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminArtistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
