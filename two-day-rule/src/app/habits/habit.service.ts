import { Habit } from './habit.model';
//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Calendar } from '@fullcalendar/core';
import timeGridMonth from '@fullcalendar/daygrid'
import { EventsForCalendar } from './events.model';

export class HabitService {
    habitsChanged = new Subject<Habit[]>();

    //habitSelected = new EventEmitter<Habit>();

  //private temp: EventsForCalendar[] = [ new EventsForCalendar('2019-12-12', 'red')];

    private habits: Habit[] = [
        new Habit('Edzés', 'Takarodj kondizni', '7/30' , 
          [ new EventsForCalendar('2020-01-12', 'green'),
            new EventsForCalendar('2020-01-18', 'red')
         ]
        ),
      ];
    
      getHabits() {
          return this.habits.slice();
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