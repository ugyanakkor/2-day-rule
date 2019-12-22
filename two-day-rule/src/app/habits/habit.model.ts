export class Habit {
    public name: string;
    public description: string;
    public progress: string;

    constructor(name: string, description: string, progress:string){
        this.name = name;
        this.description = description;
        this.progress = progress;
    }
}