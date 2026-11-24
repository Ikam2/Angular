import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Notif } from './components/notif/notif';
import { Profile } from './components/profile/profile';
import { Footer } from './components/footer/footer';
import { Friendslist } from './components/friendslist/friendslist';
import { Navbar } from './components/navbar/navbar';
import { ConferenceList } from './components/conferencelist/conferencelist';
import { ConferenceDetails } from './components/conferencedetails/conferencedetails';
import { Conference } from './models/conference';

@Component({
  selector: 'app-root',
  imports: [Header, Notif, Profile, Footer, Friendslist, Navbar, ConferenceList, ConferenceDetails],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly conferences = signal<Conference[]>([
    {
      id: 1,
      title: 'Angular 21 Conference',
      description: 'Les nouveautés d’Angular 21 : signals, zoneless et contrôle de flux natif.',
      date: new Date(2027, 10, 15),
      place: 'Tunis',
      maxParticipants: 100,
      nbParticipants: 75,
    },
    {
      id: 2,
      title: 'Signals Workshop',
      description: 'Atelier pratique sur la gestion d’état réactive avec les signals.',
      date: new Date(2027, 10, 30),
      place: 'Ariana',
      maxParticipants: 30,
      nbParticipants: 24,
    },
    {
      id: 3,
      title: 'Web Conference',
      description: 'Panorama des technologies web modernes.',
      date: new Date(2027, 10, 20),
      place: 'Sousse',
      maxParticipants: 50,
      nbParticipants: 50,
    },
    {
      id: 4,
      title: 'TypeScript Day',
      description: 'Édition 2025, déjà terminée.',
      date: new Date(2025, 4, 10),
      place: 'Monastir',
      maxParticipants: 80,
      nbParticipants: 80,
    },
  ]);

  readonly selectedConference = signal<Conference | null>(this.conferences()[1]);

  selectConference(conference: Conference): void {
    this.selectedConference.set(conference);
  }

  registerForConference(conferenceId: number): void {
    this.conferences.update((conferences) =>
      conferences.map((conference) =>
        conference.id === conferenceId && conference.nbParticipants < conference.maxParticipants
          ? { ...conference, nbParticipants: conference.nbParticipants + 1 }
          : conference,
      ),
    );

    this.selectedConference.update((conference) => {
      if (!conference || conference.id !== conferenceId || conference.nbParticipants >= conference.maxParticipants) {
        return conference;
      }

      return { ...conference, nbParticipants: conference.nbParticipants + 1 };
    });
  }
}
