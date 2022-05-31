import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { throws } from 'assert';
import { get } from 'http';
import { title } from 'process';
import { Task, TaskStatus, UpdateTask } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { query } from 'express';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFilters(filterDto);
        }
        else
            return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id);
    }

    @Post()
    createTask(@Body()
    createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    // @Put(':id')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body() status: TaskStatus,
    // ): Task {
    //     console.log(id)
    //     console.log(status)
    //     const updatedTask = this.tasksService.updateTaskStatus(id, status);
    //     return updatedTask;
    // }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
} 
