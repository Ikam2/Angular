import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show only upcoming conferences and update the selected details', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('.conference-choice')).toHaveLength(3);
    expect(compiled.textContent).not.toContain('TypeScript Day');

    const firstConference = compiled.querySelector<HTMLButtonElement>('.conference-choice');
    firstConference?.click();
    fixture.detectChanges();

    expect(compiled.querySelector('#conference')?.textContent).toContain(
      'Les nouveautés d’Angular 21',
    );
  });
});
