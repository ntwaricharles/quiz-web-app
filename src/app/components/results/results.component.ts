import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  score: number = 0;
  totalQuestions: number = 0;
  subjectTitle: string = '';
  subjectIcon: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.score = +params['score'];
      this.totalQuestions = +params['total'];
      this.subjectTitle = params['subjectTitle'] || 'Accessibility';
      this.subjectIcon = params['subjectIcon'] || 'icon-accessibility';
    });
  }

  playAgain(): void {
    this.router.navigate(['/']);
  }
}
