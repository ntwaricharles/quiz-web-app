import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial title as "quiz-web-app"', () => {
    expect(component.title).toBe('quiz-web-app');
  });

  it('should start with dark mode switched off', () => {
    expect(component.switchedToDarkMode).toBe(false);
  });

  describe('switchThemes', () => {
    it('should toggle dark mode and add/remove class on body', () => {
      // Spy on document.querySelector and mock classList.add and classList.remove
      const querySelectorSpy = jest
        .spyOn(document, 'querySelector')
        .mockReturnValue({
          classList: {
            add: jest.fn(),
            remove: jest.fn(),
          },
        } as unknown as HTMLElement);

      // First call: switch to dark mode
      component.switchThemes();
      expect(component.switchedToDarkMode).toBe(true);
      const body = document.querySelector('body');
      expect(body?.classList.add).toHaveBeenCalledWith('dark');

      // Second call: switch back to light mode
      component.switchThemes();
      expect(component.switchedToDarkMode).toBe(false);
      expect(body?.classList.remove).toHaveBeenCalledWith('dark');

      // Restore the original implementation
      querySelectorSpy.mockRestore();
    });
  });
});
