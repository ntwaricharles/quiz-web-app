import { Component, OnInit, HostListener } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DarkModeService } from '../../src/app/services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'quiz-web-app';
  isDarkMode = false;
  screenSize: 'lg' | 'md' | 'sm' = 'sm';
  quizSelected = false;
  selectedQuiz: any;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private darkModeService: DarkModeService
  ) {
    const icons = [
      'icon-accessibility',
      'icon-correct',
      'icon-css',
      'icon-error',
      'icon-html',
      'icon-incorrect',
      'icon-js',
      'icon-moon-dark',
      'icon-moon-light',
      'icon-sun-dark',
      'icon-sun-light',
      'pattern-background-desktop-dark',
      'pattern-background-desktop-light',
      'pattern-background-mobile-dark',
      'pattern-background-mobile-light',
      'pattern-background-tablet-dark',
      'pattern-background-tablet-light',
    ];

    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/images/${icon}.svg`
        )
      );
    });
  }

  ngOnInit() {
    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.updateScreenSize();

    window.addEventListener('resize', this.updateScreenSize.bind(this));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateScreenSize();
  }

  updateScreenSize() {
    const width = window.innerWidth;
    if (width >= 1024) {
      this.screenSize = 'lg';
    } else if (width >= 768 && width < 1024) {
      this.screenSize = 'md';
    } else {
      this.screenSize = 'sm';
    }
  }
}
