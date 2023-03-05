import { EventModel } from "src/app/shared/models/event.model";

export interface DetailedEventModel extends EventModel {
    password: string,
    note: string,
    alive: boolean
};