import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { UIService } from './ui.service';
import { Exercise } from '../_models/exercise.model';

import * as UI from '../_reducers/actions/ui.actions';
import * as exerciseReducer from '../_reducers/exercises.reducer';
import * as ExerciseActions from '../_reducers/actions/exercises.actions';

@Injectable()
export class ExerciseService {

    private firebaseSubscriptions: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<exerciseReducer.State>,
    ){}

    getExercises(): void {
        this.store.dispatch(new UI.StartLoading());
        this.firebaseSubscriptions.push(
            this.db
                .collection('exercises')
                .snapshotChanges()
                .map(docArray => {
                    return docArray.map(doc => {
                        const data = (doc.payload.doc.data() as Exercise);
                        return {
                        id: doc.payload.doc.id,
                        ...data
                        };
                    });
                })
                .subscribe((exercises: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.store.dispatch(new ExerciseActions.SetAllExercises(exercises));
                }, error => {
                    // console.log(error);
                    this.store.dispatch(new UI.StopLoading());
                    this.uiService.notify('Error retrieving exercises!', null, 3000);
                })
        );
    }

    startExercise(exerciseId: string): void {
        this.store.dispatch(new ExerciseActions.StartExercise(exerciseId));
    }

    completeExercise(): void {
        this.store.select(exerciseReducer.getActiveExercise).pipe(take(1)).subscribe((exercise: Exercise) => {
            this.saveExerciseData({
                ...exercise,
                date: new Date(),
                status: 'completed'
            });
            this.store.dispatch(new ExerciseActions.StopExercise());
        });
    }

    cancelExercise(progress: number): void {
        this.store.select(exerciseReducer.getActiveExercise).pipe(take(1)).subscribe((exercise: Exercise) => {
            this.saveExerciseData({
                ...exercise,
                duration: exercise.duration * (progress / 100),
                calories: exercise.calories * (progress / 100),
                date: new Date(),
                status: 'cancelled'
            });
            this.store.dispatch(new ExerciseActions.StopExercise());
        });
    }

    getCompletedExercises(): void {
        this.firebaseSubscriptions.push( 
            this.db
                .collection('completedExercises')
                .valueChanges()
                .subscribe((exercises: Exercise[]) => {
                    this.store.dispatch(new ExerciseActions.SetCompletedExercises(exercises));
            }, error => {
                console.log(error);
            })
        );
    }

    cancelSubscriptions(): void {
        this.firebaseSubscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    private saveExerciseData(exercise: Exercise): void {
        this.db.collection('completedExercises').add(exercise);
    }
}
