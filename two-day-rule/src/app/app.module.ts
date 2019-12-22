import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HabitsComponent } from './habits/habits.component';
import { HabitListComponent } from './habits/habit-list/habit-list.component';
import { HabitDetailComponent } from './habits/habit-detail/habit-detail.component';
import { HabitItemComponent } from './habits/habit-list/habit-item/habit-item.component';
import { HabitEditComponent } from './habits/habit-list/habit-edit/habit-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HabitsComponent,
    HabitListComponent,
    HabitDetailComponent,
    HabitItemComponent,
    HabitEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
