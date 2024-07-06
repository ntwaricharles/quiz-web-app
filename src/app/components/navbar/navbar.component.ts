// src/app/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    // Subscribe to dark mode changes
    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.applyDarkMode(this.isDarkMode);
    });

    // Check initial system preference
    this.checkSystemDarkMode();

    // Add event listener for system dark mode changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.checkSystemDarkMode.bind(this));
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeService.setDarkMode(this.isDarkMode);
  }

  private checkSystemDarkMode(event?: MediaQueryListEvent): void {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.isDarkMode = event ? event.matches : prefersDarkMode;
    this.darkModeService.setDarkMode(this.isDarkMode);
  }

  private applyDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
