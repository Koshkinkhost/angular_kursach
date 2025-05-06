import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from './admin.service';
import { ArtistRoyaltyDto } from './artistIncome';
@Component({
  selector: 'app-admin-artist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-artist.component.html',
  styleUrl: './admin-artist.component.css'
})
export class AdminArtistComponent implements OnInit {
  artists: ArtistRoyaltyDto[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  async ngOnInit() {
    this.loading = true;
    try {
      this.artists = await this.adminService.getArtistsWithRoyalties();
this.artists.forEach(artist => {
  artist.showInput = false;
});

    } catch (e: any) {
      this.error = 'Ошибка при загрузке артистов';
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
  editRoyalty(artist: ArtistRoyaltyDto) {
    console.log('Изменение роялти для:', artist);
  }
  toggleInput(artist: any) {
    artist.showInput = !artist.showInput;
    if (!artist.newRoyalty) {
      artist.newRoyalty = 0;
    }
  }
  updateRoyalty(artist: any, value: string) {
    const royalty = parseFloat(value);
    if (isNaN(royalty)) return;
  
    artist.totalIncome += royalty;
    artist.showInput = false;
  }
}
