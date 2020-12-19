import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Exercise } from 'src/app/_models/exercise.model';

import { ExerciseService } from 'src/app/_services/exercise.service';

import * as exerciseReducer from '../../../_reducers/exercises.reducer';

@Component({
  selector: 'app-past-exercise',
  templateUrl: './past-exercise.component.html',
  styleUrls: ['./past-exercise.component.css']
})
export class PastExerciseComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'exercise', 'duration', 'calories', 'status'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<exerciseReducer.State>,
  ) { }

  ngOnInit(): void {
    this.handleExerciseData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  handleExerciseData(): void {
    this.store.select(exerciseReducer.getCompletedExercises)
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });
    this.exerciseService.getCompletedExercises();
  }

  filterExercises(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
