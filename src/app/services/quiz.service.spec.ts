import { TestBed } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import { QUIZZES } from '../../data';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizService],
    });
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSubjects', () => {
    it('should return an array of quiz titles and icons', () => {
      const expectedSubjects = QUIZZES.map((quiz) => ({
        title: quiz.title,
        icon: quiz.icon,
      }));

      expect(service.getSubjects()).toEqual(expectedSubjects);
    });
  });

  describe('getQuestions', () => {
    it('should return questions for a given subject title', () => {
      const subjectTitle = 'Sample Quiz Title'; // Replace with an actual title from QUIZZES
      const expectedQuestions =
        QUIZZES.find((quiz) => quiz.title === subjectTitle)?.questions || [];

      expect(service.getQuestions(subjectTitle)).toEqual(expectedQuestions);
    });

    it('should return an empty array for a non-existing subject title', () => {
      const nonExistingTitle = 'Non-Existing Title';

      expect(service.getQuestions(nonExistingTitle)).toEqual([]);
    });
  });
});
