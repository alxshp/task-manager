import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/task.service';
import { Task } from '../../models/task.model';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    TaskFormComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filter = '';
  showForm = false;

  sortBy: 'title' | 'status' = 'title';
  sortAsc = true;

  constructor(public taskService: TaskService, public router: Router) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((ts) => (this.tasks = ts));
  }

  delete(id: number) {
    this.taskService.deleteTask(id);
  }

  viewDetails(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  get sortedTasks(): Task[] {
    const filtered = this.tasks.filter((t) =>
      t.title.toLowerCase().includes(this.filter.toLowerCase())
    );
    return filtered.sort((a, b) => {
      let cmp: number;
      if (this.sortBy === 'title') {
        cmp = a.title.localeCompare(b.title);
      } else {
        cmp = a.status.localeCompare(b.status);
      }
      return this.sortAsc ? cmp : -cmp;
    });
  }

  toggleSortDir() {
    this.sortAsc = !this.sortAsc;
  }
}
