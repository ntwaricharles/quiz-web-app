import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isDarkMode = document.documentElement.classList.contains('dark');
    this.toggleDarkModeListener();
  }

  toggleDarkModeListener(): void {
    const darkModeToggle = document.getElementById('toggle-dark-mode');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        this.isDarkMode = document.documentElement.classList.toggle('dark');
      });
    }
  }
}
