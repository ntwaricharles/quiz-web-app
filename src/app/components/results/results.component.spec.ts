import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let mockActivatedRoute: any;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    mockActivatedRoute = {
      queryParams: of({}), // Simulating absence of query parameters
    };

    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

 it('should use default values when query params are not provided', () => {
   fixture.detectChanges(); // Ensure that ngOnInit has been called
   expect(component.score).toBe(0);
   expect(component.totalQuestions).toBe(0);
   expect(component.subjectTitle).toBe('Accessibility');
   expect(component.subjectIcon).toBe('icon-accessibility');
 });

  it('should navigate to home page on playAgain', () => {
    component.playAgain();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
