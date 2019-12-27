import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-habit-edit',
  templateUrl: './habit-edit.component.html',
  styleUrls: ['./habit-edit.component.css']
})
export class HabitEditComponent implements OnInit {
  id: number;
  editMode = false;
  habitForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private habitService: HabitService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id=+params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    // const newHabit = new Habit(
    //   this.habitForm.value.name, 
    //   this.habitForm.value.description, 
    //   this.habitForm.value.progress);

    if (this.editMode) {
      this.habitService.updateHabit(this.id, this.habitForm.value);
    } else {
      this.habitService.addHabit(this.habitForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {

  let habitName = '';
  let habitDescription = '';
  let habitProgress = '';
  
  if(this.editMode) {
    const habit = this.habitService.getHabit(this.id);
    habitName = habit.name;
    habitDescription = habit.description;
    habitProgress = habit.progress;
  }

  this.habitForm = new FormGroup({
      'name': new FormControl(habitName, Validators.required),
      'description': new FormControl(habitDescription, Validators.required),
      'progress': new FormControl(habitProgress, Validators.required)
    });
  }

}
