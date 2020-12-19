import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-exercise',
  templateUrl: './stop-exercise.component.html',
  styleUrls: ['./stop-exercise.component.css']
})
export class StopExerciseComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public exerciseData: any
  ) {}

  ngOnInit(): void {
  }

}
