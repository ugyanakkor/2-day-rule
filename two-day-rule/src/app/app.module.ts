import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HabitsComponent } from './habits/habits.component';
import { HabitListComponent } from './habits/habit-list/habit-list.component';
import { HabitDetailComponent } from './habits/habit-detail/habit-detail.component';
import { HabitItemComponent } from './habits/habit-list/habit-item/habit-item.component';
import { HabitEditComponent } from './habits/habit-edit/habit-edit.component';
import { AuthComponent } from './auth/auth.component';
import { DropdownDirective } from './habits/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { HabitsStartComponent } from './habits/habits-start/habits-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HabitsComponent,
    HabitListComponent,
    HabitDetailComponent,
    HabitItemComponent,
    HabitEditComponent,
    AuthComponent,
    DropdownDirective,
    HabitsStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
