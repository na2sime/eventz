import User from "./User.model";

export default interface Event {
    eventId: string;
    name: string;
    imageUrl: string;
    description: string;
    date: Date;
    location: string;
    maxPlaces: number;
    owner: User;
    members: User[];
}