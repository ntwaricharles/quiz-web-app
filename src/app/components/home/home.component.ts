import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  subjects: any[] = [];
  questions: any[] = [];
  selectedSubject = new EventEmitter<string>();

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    this.fetchSubjects();
  }

  fetchSubjects(): void {
    this.subjects = this.quizService.getSubjects();
    console.log(this.subjects)
  }

  onSubjectSelected(subjectTitle: string) {
    this.selectedSubject.emit(subjectTitle);
    this.router.navigate(['/quiz', subjectTitle]);
  }
}
