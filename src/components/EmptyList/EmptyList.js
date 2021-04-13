import React, { Component } from 'react';
import './EmptyList.css';

class EmptyList extends Component {
    render() {
        return(
            <div className='EmptyList'>
                <p>It seems you don't have any pending tasks right now</p>
            </div>
        );
    }
}

export default EmptyList;