import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import MenuButton from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/NavBarStyles';

class Navbar extends Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position='static' color='primary'>
					<Toolbar>
						<IconButton className={classes.menuButton} color='inherit'>
							<MenuButton />
						</IconButton>
						<Typography className={classes.title} variant='h5' color='inherit'>
							Dashboard
						</Typography>
						<div className={classes.grow} />
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}
export default withStyles(styles)(Navbar);
