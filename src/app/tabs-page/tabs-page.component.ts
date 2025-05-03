import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.css'],
  imports: [CommonModule],
})
export class TabsPageComponent implements OnInit {
  activeTab: string = 'current';
  currentGifUrl: string = 'https://via.placeholder.com/150'; // Placeholder inicial
  currentFact: string = '';
  searchHistory: {
    id: number;
    search_date: string;
    fact: string;
    query: string;
    gif_url: string;
  }[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.refreshFact();
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'history') {
      this.getHistory();
    }
  }

  getGif(): void {
    this.apiService.getGif(this.currentFact).subscribe((response) => {
      this.currentGifUrl = response.gifUrl || this.currentGifUrl;
    });
  }

  refreshFact(): void {
    this.apiService.getFact().subscribe((response) => {
      this.currentFact = response.fact || this.currentFact;
      this.getGif();
    });
  }

  refreshGif(): void {
    this.apiService.getFact().subscribe((response) => {
      const newQuery = response.fact?.split(' ').slice(0, 3).join(' ');
      this.apiService.getGif(newQuery).subscribe((gifResponse) => {
        this.currentGifUrl = gifResponse.gifUrl || this.currentGifUrl;
      });
    });
  }

  getHistory(): void {
    this.apiService.getHistory().subscribe((responseHistory) => {
      console.log('🚀 ~ responseHistory:', responseHistory);
      this.searchHistory = responseHistory;
    });
  }
}
