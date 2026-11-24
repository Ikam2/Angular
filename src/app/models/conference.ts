export interface Conference {
	id: number;
	title: string;
	description: string;
	date: Date;
	place: string;
	maxParticipants: number;
	nbParticipants: number;
}

export function getRemainingPlaces(conference: Conference): number {
	return Math.max(0, conference.maxParticipants - conference.nbParticipants);
}
