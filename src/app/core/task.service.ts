import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly STORAGE_KEY = 'task_manager_tasks';

  private tasks: Task[] = [];
  private tasks$ = new BehaviorSubject<Task[]>(this.tasks);
  private idCounter = 1;

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const json = localStorage.getItem(this.STORAGE_KEY);
    if (json) {
      try {
        this.tasks = JSON.parse(json) as Task[];
        this.idCounter = this.tasks.length
          ? Math.max(...this.tasks.map(t => t.id)) + 1
          : 1;
      } catch {
        this.tasks = [];
        this.idCounter = 1;
      }
    }
    this.tasks$.next(this.tasks);
  }

  private saveTasks() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    this.tasks$.next(this.tasks);
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(title: string, description?: string) {
    const newTask: Task = {
      id: this.idCounter++,
      title,
      description,
      status: 'pending'
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }

  updateTaskStatus(id: number, status: 'pending' | 'completed') {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
      this.saveTasks();
    }
  }
}
