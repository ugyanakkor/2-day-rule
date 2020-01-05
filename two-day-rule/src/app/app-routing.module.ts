import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HabitsComponent } from './habits/habits.component';
import { AuthComponent } from './auth/auth.component';
import { HabitsStartComponent } from './habits/habits-start/habits-start.component';
import { HabitDetailComponent } from './habits/habit-detail/habit-detail.component';
import { HabitEditComponent } from './habits/habit-edit/habit-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/habits', pathMatch: 'full' },
    { path: 'habits', component: HabitsComponent, children: [
        { path: '', component: HabitsStartComponent },
        { path: 'new', component: HabitEditComponent},
        { path: ':id', component: HabitDetailComponent },
        { path: ':id/edit', component: HabitEditComponent}
    ] },
    { path: '**', redirectTo: '/habits', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}