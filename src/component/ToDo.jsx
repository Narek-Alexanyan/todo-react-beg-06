import React, { Component } from 'react';
import AddNewTask from './AddNewTask';

import './ToDo.scss'

class ToDo extends Component {
    state = {
        inputValue: ''
    }
    handleSubmit = (value) => {
        console.log('value:', value);
    }
    render() {
        return (
            <div>
                <AddNewTask handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default ToDo;