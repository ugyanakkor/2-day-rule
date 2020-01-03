import { EventsForCalendar } from './events.model';

export class Habit {
    public name: string;
    public description: string;
    public progress: string;
    public calendarEventsFromHabit: EventsForCalendar[];

    constructor(name: string, description: string, progress:string, calendarEventsFromHabit: EventsForCalendar[]){
        this.name = name;
        this.description = description;
        this.progress = progress;
        this.calendarEventsFromHabit = calendarEventsFromHabit;
    }
}