import { EventsForCalendar } from './events.model';
import { EventInput } from '@fullcalendar/core';

export class Habit {
    public name: string;
    public description: string;
    public progress: number;
    //public calendarEventsFromHabit: EventsForCalendar[];
    public events: EventInput[];

    constructor(name: string, description: string, progress:number, events: EventInput[]){
        this.name = name;
        this.description = description;
        this.progress = progress;
        this.events = events;
    }
}