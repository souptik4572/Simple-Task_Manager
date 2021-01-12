import React, { Component } from 'react';
import './Task.css';
import { v4 as uuid } from 'uuid';

import Todo from '../Todo/Todo';

class Task extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTodo: '', // keeping track of new todo
			taskText: this.props.text,
			isGettingEdited: false // based on this value a form will show up to edit the task title
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleEditForm = this.toggleEditForm.bind(this);
		this.handleEditSubmit = this.handleEditSubmit.bind(this);
		this.handleEditChange = this.handleEditChange.bind(this);
		this.handleTaskDelete = this.handleTaskDelete.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.handleOnDrop = this.handleOnDrop.bind(this);
	}
	handleChange(event) { // handling change for input form of new todo
		this.setState({ newTodo: event.target.value });
	}
	handleSubmit(event) { // handling submit for input form of new todo
		event.preventDefault();
		const newTodoObject = {
			id: uuid(),
			text: this.state.newTodo
		};
		this.props.addTodoToTask(this.props.id, newTodoObject);
		this.setState({ newTodo: '' });
	}
	toggleEditForm() { // to toggle the isGettingEdited state and enable option for editing the title of the task
		this.setState({ isGettingEdited: !this.state.isGettingEdited });
	}
	handleEditSubmit(event) { // handling submit for edit form of existing task
		event.preventDefault();
		this.props.editTask(this.props.id, this.state.taskText);
		this.toggleEditForm();
	}
	handleEditChange(event) { // handling change for edit form of existing task
		this.setState({ taskText: event.target.value });
	}
	handleTaskDelete() { // handling delete option for existing task
		this.props.deleteTask(this.props.id);
	}
	onDragOver = (event) => {
		event.preventDefault();
	}
	handleOnDrop(event) {
		this.props.onDrop(event, this.props.id);
	}
	render() {
		const { id, text, todos, deleteTodoFromTask, allocateDraggedTodo } = this.props;
		const editForm = (
			<form onSubmit={this.handleEditSubmit} className='Task-title-text'>
				<input type='text' value={this.state.taskText} onChange={this.handleEditChange} />
				<button>Submit</button>
			</form>
		);
		const allTodos = todos.map((aTodo) => { // making a list of all the todos inside the Task
			return <Todo key={aTodo.id} {...aTodo} taskId={id} deleteTodoFromTask={deleteTodoFromTask} allocateDraggedTodo={allocateDraggedTodo} />;
		});
		return (
			<div className='Task' onDragOver={this.onDragOver} onDrop={this.handleOnDrop}>
				{this.state.isGettingEdited ? ( // based on this value we are either going to show the editForm or the task title
					editForm
				) : (
					<div className='Task-title'>
						<p className='Task-title-text'>{text}</p>
						<span className='Task-options'>
							<button onClick={this.handleTaskDelete}><i className="fas fa-trash"></i></button>
							<button onClick={this.toggleEditForm}><i className="fas fa-pencil-alt"></i></button>
						</span>
					</div>
				)}
				<div className='Task-container'>
					{allTodos}
				</div>
				<form className='Task-add' onSubmit={this.handleSubmit}>
					<textarea
						type='text'
						placeholder='Type todo here ...'
						value={this.state.newTodo}
						onChange={this.handleChange}
					/>
					<button className='add-card ui-button ui-corner-all'>Add Card</button>
				</form>
			</div>
		);
	}
}

export default Task;
