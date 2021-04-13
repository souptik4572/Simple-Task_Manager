import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar';
import TaskList from '../TaskList/TaskList';
import EmptyList from '../EmptyList/EmptyList';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [], // a list of all the different tasks
			draggedTodo: {}, // when we are dragging a todo, it will keep a track of the todo
			parentTask: '', // the Task in which the draggedTodo was assigned
		};
		this.addNewTask = this.addNewTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		this.editTask = this.editTask.bind(this);
		this.addTodoToTask = this.addTodoToTask.bind(this);
		this.deleteTodoFromTask = this.deleteTodoFromTask.bind(this);
		this.allocateDraggedTodo = this.allocateDraggedTodo.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}
	componentDidMount() {
		const json = window.localStorage.getItem('tasks');
		const allTasks = JSON.parse(json === null ? '[]' : json);
		this.setState({ tasks: allTasks });
	}
	componentDidUpdate() {
		window.localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); // using local storage to keep track of all the tasks
	}
	addNewTask(newTask) {
		// for adding the new Task
		this.setState({ tasks: [...this.state.tasks, newTask] });
	}
	deleteTask(uniqueId) {
		// for deleting existing task
		const newTasks = this.state.tasks.filter((aTask) => {
			return aTask.id !== uniqueId;
		});
		this.setState({ tasks: newTasks });
	}
	editTask(uniqueId, editedTask) {
		// to edit the task title
		const newTasks = this.state.tasks.map((aTask) => {
			if (aTask.id === uniqueId) {
				return { ...aTask, text: editedTask };
			}
			return aTask;
		});
		this.setState({ tasks: newTasks });
	}
	addTodoToTask(uniqueId, newTodo) {
		// adding a certain todo to a a certain task
		const newTaskList = this.state.tasks.map((aTask) => {
			if (aTask.id === uniqueId) {
				// if the taskid is same only then the todo will be added
				return { ...aTask, todos: [...aTask.todos, newTodo] };
			}
			return aTask;
		});
		this.setState({ tasks: newTaskList });
	}
	deleteTodoFromTask(uniqueIdOfTask, uniqueIdOfTodo) {
		// deleting a certain todo from a certain task
		const newTaskList = this.state.tasks.map((aTask) => {
			if (aTask.id === uniqueIdOfTask) {
				// if the task id is same, only then from that task the todo will be deleted
				const newTodoList = aTask.todos.filter((aTodo) => {
					// filtering out the deleted task and assinging back the new todo list
					return aTodo.id !== uniqueIdOfTodo;
				});
				return { ...aTask, todos: newTodoList };
			}
			return aTask;
		});
		this.setState({ tasks: newTaskList });
	}
	allocateDraggedTodo(todo, parentTaskId) {
		// to keep track of the dragged todo
		this.setState({ draggedTodo: todo, parentTask: parentTaskId });
	}
	onDrop = (event, taskId) => {
		// When we are dragging and dropping our required todo from one task to another task this is called. It is taking two parameters which are the event itself and the id of the task where we are dropping this todo
		event.preventDefault();
		if (taskId === this.state.parentTask) {
			return;
		}
		let newTasks = this.state.tasks.map((aTask) => {
			// first we are adding our dragged todo to our new Task
			if (aTask.id === taskId) {
				return { ...aTask, todos: [...aTask.todos, this.state.draggedTodo] };
			} else if (aTask.id === this.state.parentTask) {
				return {
					...aTask,
					todos: aTask.todos.filter((aTodo) => {
						return aTodo.id !== this.state.draggedTodo.id;
					}),
				};
			}
			return aTask;
		});
		this.setState({
			tasks: newTasks,
			draggedTodo: {},
			parentTask: '',
		});
	};
	render() {
		return (
			<div className='Dashboard'>
				<Navbar addNewTask={this.addNewTask} />
				{this.state.tasks.length === 0 ? (
					<EmptyList />
				) : (
					<TaskList
						addNewTask={this.addNewTask}
						tasks={this.state.tasks}
						deleteTask={this.deleteTask}
						editTask={this.editTask}
						addTodoToTask={this.addTodoToTask}
						deleteTodoFromTask={this.deleteTodoFromTask}
						draggedTodo={this.state.draggedTodo}
						allocateDraggedTodo={this.allocateDraggedTodo}
						onDrop={this.onDrop}
					/>
				)}
			</div>
		);
	}
}

export default Dashboard;
