import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { QuestionsComponent } from './questions.component';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let mockActivatedRoute: any;
  let mockRouter: jest.Mocked<Router>;
  let mockQuizService: jest.Mocked<QuizService>;

  beforeEach(() => {
    mockActivatedRoute = {
      paramMap: of(new Map([['subjectTitle', 'Math']])),
    };

    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    mockQuizService = {
      getQuestions: jest.fn().mockReturnValue([
        { question: '2 + 2?', answer: '4', options: ['3', '4', '5'] },
        { question: '5 - 3?', answer: '2', options: ['1', '2', '3'] },
      ]),
    } as unknown as jest.Mocked<QuizService>;

    TestBed.configureTestingModule({
      declarations: [QuestionsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: QuizService, useValue: mockQuizService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct values from query params', () => {
    expect(component.subjectTitle).toBe('Math');
    expect(component.subjectIcon).toBe('icon-accessibility');
    expect(component.questions).toEqual([
      { question: '2 + 2?', answer: '4', options: ['3', '4', '5'] },
      { question: '5 - 3?', answer: '2', options: ['1', '2', '3'] },
    ]);
    expect(component.currentQuestion).toEqual({
      question: '2 + 2?',
      answer: '4',
      options: ['3', '4', '5'],
    });
  });

  it('should load the correct question', () => {
    component.loadQuestion(1);
    expect(component.currentQuestion).toEqual({
      question: '5 - 3?',
      answer: '2',
      options: ['1', '2', '3'],
    });
    expect(component.correctAnswer).toBe('2');
  });

  it('should select an answer', () => {
    component.selectAnswer('4');
    expect(component.selectedAnswer).toBe('4');
    expect(component.showError).toBe(false);
  });

  it('should handle answer submission correctly', () => {
    // Test case for a correct answer
    component.selectAnswer('4');
    component.submitAnswer();
    expect(component.showResult).toBe(true);
    expect(component.answered).toBe(true);
    expect(component.correctAnswer).toBe(true);
    expect(component.score).toBe(1);

    // Reset for the next test
    component.loadQuestion(1);

    // Test case for an incorrect answer
    component.selectAnswer('3');
    component.submitAnswer();
    expect(component.showResult).toBe(true);
    expect(component.answered).toBe(true);
    expect(component.correctAnswer).toBe(false);
    expect(component.score).toBe(1);
  });


  it('should navigate to results page with correct query params', () => {
    component.score = 2;
    component.currentQuestionIndex = 1;
    component.nextQuestion();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/results'], {
      queryParams: {
        score: 2,
        total: 2,
        subjectTitle: 'Math',
        subjectIcon: 'icon-accessibility',
      },
    });
  });
});
