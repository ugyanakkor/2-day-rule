import { Habit } from './habit.model';
import { Subject } from 'rxjs';

export class HabitService {
    habitsChanged = new Subject<Habit[]>();

    private habits: Habit[] = [
        new Habit('Edzés', 'Kétszer végtelen és haza mehetsz', 2 , 
           [ 
             {  start: '2020-01-13', backgroundColor: 'green', rendering:"background" },
             {  start: '2020-01-14', backgroundColor: 'green', rendering:"background" }
          ]
        ),
      ];
    
      getHabits() {
        return this.habits.slice(); 
      }

      //localStorage
      setHabits(){
        const habitsData = JSON.parse(localStorage.getItem('habits'));
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