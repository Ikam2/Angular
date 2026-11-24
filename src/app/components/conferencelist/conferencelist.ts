import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Conference, getRemainingPlaces } from '../../models/conference';

@Component({
  selector: 'app-conferencelist',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './conferencelist.html',
  styleUrl: './conferencelist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceList {
  readonly conferences = input.required<Conference[]>();
  readonly selectedConferenceId = input<number | null>(null);
  readonly selected = output<Conference>();
  readonly registerRequested = output<number>();
  readonly searchTerm = signal('');

  readonly upcomingConferences = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const searchTerm = this.searchTerm().trim().toLocaleLowerCase();

    return this.conferences().filter(
      (conference) =>
        conference.date >= today && conference.title.toLocaleLowerCase().includes(searchTerm),
    );
  });

  remainingPlaces(conference: Conference): number {
    return getRemainingPlaces(conference);
  }

  updateSearch(event: Event): void {
    const inputElement = event.target;
    if (inputElement instanceof HTMLInputElement) {
      this.searchTerm.set(inputElement.value);
    }
  }
}