import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  subjects: any[] = [];
  @Output() selectedSubject = new EventEmitter<{
    title: string;
    icon: string;
  }>();

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    this.fetchSubjects();
  }

  fetchSubjects(): void {
    this.subjects = this.quizService.getSubjects();
    console.log(this.subjects);
  }

  onSubjectSelected(subject: { title: string; icon: string }) {
    this.selectedSubject.emit(subject);
    this.router.navigate(['/quiz', subject.title]);
  }
}
