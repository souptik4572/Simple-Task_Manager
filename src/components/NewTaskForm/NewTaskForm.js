import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './NewTaskForm.css';

class NewTaskForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTask: '' // keeping track of the new task
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) { // handling change in the input form of new task
		this.setState({ newTask: event.target.value });
	}
	handleSubmit(event) { // handling submit for input form of new task
		event.preventDefault();
		const newTaskObject = {
			id: uuid(), // assigning unique id to every task
			text: this.state.newTask,
			todos: [] // initially all tasks will have an empty list of todos
		};
		this.props.addNewTask(newTaskObject);
		this.setState({ newTask: '' });
	}
	render() {
		return (
			<div className='NewTaskForm'>
				<form onSubmit={this.handleSubmit} autoComplete='off'>
					<TextField id='outlined-basic' label='Add New Task' variant='outlined' value={this.state.newTask} onChange={this.handleChange} />
					<Button onClick={this.handleSubmit} color='primary' variant='contained'>Submit</Button>
				</form>
			</div>
		);
	}
}

export default NewTaskForm;
