import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  score: number = 0;
  totalQuestions: number = 0;
  subjectTitle: string = 'Accessibility';
  subjectIcon: string = 'icon-accessibility';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.score = +params['score'] || 0;
      this.totalQuestions = +params['total'] || 0;
      this.subjectTitle = params['subjectTitle'] || 'Accessibility';
      this.subjectIcon = params['subjectIcon'] || 'icon-accessibility';
    });
  }

  playAgain(): void {
    this.router.navigate(['/']);
  }
}
