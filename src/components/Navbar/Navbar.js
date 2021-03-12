import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: 'block',
		// [theme.breakpoints.up('sm')]: {
		//   display: 'block',
		// },
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	AddIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '40ch',
			'&:focus': {
				width: '50ch',
			},
		},
	},
}));

export default function SearchAppBar(props) {
	const [newTask, setNewTask] = useState('');
	const { addNewTask } = props;
	const handleChange = (event) => {
		setNewTask(event.target.value);
	};
	const handleSubmit = (event) => {
		if(newTask.trim() === '') {
			alert('Empty task is not accepted');
			return;
		}
		event.preventDefault();
		const newTaskObject = {
			id: uuid(), // assigning unique id to every task
			text: newTask,
			todos: [], // initially all tasks will have an empty list of todos
		};
		addNewTask(newTaskObject);
		setNewTask('');
	};
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Container>
					<Toolbar>
						<Typography className={classes.title} variant='h6' noWrap>
							Dashboard
						</Typography>
						<form className={classes.search} onSubmit={handleSubmit}>
							<div className={classes.AddIcon}>
								<AddIcon />
							</div>
							<InputBase
								placeholder='Add New Task'
								value={newTask}
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
								onChange={handleChange}
							/>
							<Button type='submit' variant='contained' color='secondary'>
								Add
							</Button>
						</form>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}
