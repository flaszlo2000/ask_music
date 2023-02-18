import { OnGoingEventModel } from "src/app/shared/models/ongoing_event.model";

export interface DetailedEventModel extends OnGoingEventModel {
    password: string,
    note: string,
    alive: boolean
};