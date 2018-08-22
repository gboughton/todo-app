import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getTasksQuery, addTaskMutation } from '../queries/queries';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    submitForm(e) {
        e.preventDefault();
        //prevents adding an empty task
        if (this.state.title === '') {
            return
        }
        //sends query to create a new task, then refresh the list of tasks
        this.props.addTaskMutation({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query: getTasksQuery }]
        })
    }

    //defines what component will be when used in App.js
    render() {
        return (
            <form id="addTask" onSubmit={this.submitForm.bind(this)}>
                <div>
                    <label>Task: </label>
                    <input type='text' onChange={(e) => this.setState({ title: e.target.value })} />
                    <button>Add</button>
                </div>
            </form>
        );
    }
}

export default compose (
    graphql(addTaskMutation, {name: "addTaskMutation"}))
    (AddTask);