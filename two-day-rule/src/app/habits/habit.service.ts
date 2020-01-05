import { Habit } from './habit.model';
//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Calendar, EventInput } from '@fullcalendar/core';
import timeGridMonth from '@fullcalendar/daygrid'
import { EventsForCalendar } from './events.model';

export class HabitService {
    habitsChanged = new Subject<Habit[]>();

    //habitSelected = new EventEmitter<Habit>();

  //private temp: EventsForCalendar[] = [ new EventsForCalendar('2019-12-12', 'red')];

    private habits: Habit[] = [
        new Habit('Edzés', 'Takarodj kondizni', 2 , 
           [ 
             {  start: '2020-01-13', backgroundColor: 'green', rendering:"background" },
             {  start: '2020-01-14', backgroundColor: 'green', rendering:"background" }
          ]
        ),
        new Habit('Olvasás', 'Takarodj olvasni', 1 , 
        [ {  start: '2020-01-16', backgroundColor: 'green', rendering:"background" } ]
      ),
      ];


    
      getHabits() {
        /*const habitsData = JSON.parse(localStorage.getItem('habits'));
        console.log('habitsdata:');
        console.log(habitsData);
        if(!habitsData){
          return this.habits.slice(); 
        }else{
          this.habits = habitsData; 
          return this.habits.slice(); 
        }*/
       /* const habitsData = JSON.parse(localStorage.getItem('habits'));
        if(habitsData){
          this.habits = habitsData;
        }*/
        return this.habits.slice(); 
      }

      setHabits(){
        const habitsData = JSON.parse(localStorage.getItem('habits'));
        console.log('habitsdata:');
        console.log(habitsData);
        if(!habitsData){
          return this.habits.slice(); 
        }else{
          this.habits = habitsData; 
          return this.habits.slice(); 
        }
      }

      getHabit(index: number) {
          return this.habits[index];
      }

      addHabit(habit: Habit) {
        this.habits.push(habit);
        this.habitsChanged.next(this.habits.slice());
      }

      updateHabit(index: number, newHabit: Habit) {
        this.habits[index] = newHabit;
        this.habitsChanged.next(this.habits.slice());
      }

      deleteHabit(index: number) {
          this.habits.splice(index, 1);
          this.habitsChanged.next(this.habits.slice());
      }
}