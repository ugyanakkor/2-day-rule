import { EventInput } from '@fullcalendar/core';

export class Habit {
    public name: string;
    public description: string;
    public progress: number;
    public events: EventInput[];
    public habitFail: boolean;

    constructor(name: string, description: string, progress?:number, events?: EventInput[], habitFail?:boolean){
        this.name = name;
        this.description = description;
        this.progress = progress || 0;
        this.events = events || [];
        this.habitFail = habitFail || false;
    }

}