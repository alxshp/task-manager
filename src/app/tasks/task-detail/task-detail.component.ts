import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatIconModule }       from '@angular/material/icon';
import { MatButtonModule }     from '@angular/material/button';
import { MatCheckboxModule }   from '@angular/material/checkbox';
import { MatListModule }       from '@angular/material/list';
import { MatCardModule }       from '@angular/material/card';import { TaskService } from '../../core/task.service';
import { Task } from '../../models/task.model';


@Component({
  standalone: true,
  selector: 'app-task-detail',
  imports: [RouterModule, NgIf, MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,  ],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    const idStr = this.route.snapshot.paramMap.get('id')!;
    const id = Number(idStr);
    this.task = this.taskService.getTaskById(id);
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
