import React, { Component } from 'react';
import './TaskList.css';
import Task from './Task';
import NewTaskForm from './NewTaskForm';

class TaskList extends Component {
	render() {
		const { addNewTask, deleteTask, editTask, addTodoToTask, deleteTodoFromTask, tasks, draggedTodo, allocateDraggedTodo, onDrop } = this.props;
		const allTasks = tasks.map((aTask) => { // mapping and forming a list of all the Tasks
			return (
				<Task
					key={aTask.id}
					{...aTask}
					deleteTask={deleteTask}
					editTask={editTask}
					addTodoToTask={addTodoToTask}
					deleteTodoFromTask={deleteTodoFromTask}
					draggedTodo={draggedTodo}
					allocateDraggedTodo={allocateDraggedTodo}
					onDrop={onDrop}
				/>
			);
		});
		return (
			<div className='TaskList-lists-container'>
				{allTasks}
				<NewTaskForm addNewTask={addNewTask} />
			</div>
		);
	}
}

export default TaskList;
