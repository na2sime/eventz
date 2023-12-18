import Event from "./Event.model";

export default interface User {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    events: Event[];
    ownEvents: Event[];
}