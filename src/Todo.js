import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete() { // handling delete option for existing todo
        this.props.deleteTodoFromTask(this.props.taskId, this.props.id);
	}
	onDrag = (event) => { // the function is called when we are starting to drag a todo
		event.preventDefault();
		this.props.allocateDraggedTodo({
			id: this.props.id,
			text: this.props.text
		}, this.props.taskId);
	}
	render() {
        const { text } = this.props;
		return (
			<div className='Todo' onDrag={this.onDrag} draggable>
				<p>{text}<span><button onClick={this.handleDelete}>Remove</button></span></p>
			</div>
		);
	}
}

export default Todo;
