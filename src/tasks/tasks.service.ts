import { Injectable, NotFoundException } from '@nestjs/common';

export interface Task {
  id: number;
  fecha: string;
  descripcion: string;
  realizado: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: 1, fecha: '2024-08-29', descripcion: 'Tarea 1', realizado: false },
    { id: 2, fecha: '2024-08-30', descripcion: 'Tarea 2', realizado: true },
    { id: 3, fecha: '2024-08-31', descripcion: 'Tarea 3', realizado: false },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  create(task: Omit<Task, 'id'>): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      ...task,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, updatedTask: Partial<Omit<Task, 'id'>>): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    Object.assign(task, updatedTask);
    return task;
  }

  remove(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    this.tasks.splice(taskIndex, 1);
  }
}
