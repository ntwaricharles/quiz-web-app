import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  subjectTitle: string | null = null;
  questions: any[] = [];
  currentQuestionIndex = 0;
  currentQuestion: any = null;
  selectedAnswer: string | null = null;
  showResult = false;
  correctAnswer: boolean | null = null;
  score = 0;
  answered: boolean | null = null;
  showError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.subjectTitle = params.get('subjectTitle');
      if (this.subjectTitle) {
        this.questions = this.quizService.getQuestions(this.subjectTitle);
        console.log(this.questions);
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.correctAnswer = this.currentQuestion.answer;
      }
    });
  }

  loadQuestion(index: number): void {
    this.currentQuestion = this.questions[index];
    this.correctAnswer = this.currentQuestion.answer;
    this.selectedAnswer = null;
    this.showResult = false;
    this.answered = false;
    this.showError = false;
  }

  selectAnswer(option: string): void {
    if (!this.answered) {
      this.selectedAnswer = option;
      this.showError = false;
    }
  }

  submitAnswer(): void {
    if (this.selectedAnswer === null) {
      this.showError = true;
    } else {
      this.showResult = true;
      this.answered = true;
      this.correctAnswer = this.selectedAnswer === this.currentQuestion.answer;
      if (this.correctAnswer) {
        this.score++;
      }
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion(this.currentQuestionIndex);
    } else {
      console.log('Quiz completed! Score:', this.score);
      this.router.navigate(['/result']);
    }
  }
}
