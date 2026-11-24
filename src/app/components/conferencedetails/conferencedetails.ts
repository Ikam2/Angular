import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Conference, getRemainingPlaces } from '../../models/conference';

@Component({
  selector: 'app-conferencedetails',
  imports: [DatePipe],
  templateUrl: './conferencedetails.html',
  styleUrl: './conferencedetails.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceDetails {
  readonly conference = input<Conference | null>(null);
  readonly registerRequested = output<number>();

  remainingPlaces(conference: Conference): number {
    return getRemainingPlaces(conference);
  }
}