import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getTasksQuery, deleteTaskMutation,
  changeCompletedMutation} from '../queries/queries';

class ListTasks extends Component{
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
    this.changeCompleted = this.changeCompleted.bind(this);
  }
  
  //turns gql query into a callable function
  deleteTask(id) {
    this.props.deleteTaskMutation({
      variables: {
        id: id
      },
      refetchQueries: [{ query: getTasksQuery }]
    })
  }

  changeCompleted(id){
    this.props.changeCompletedMutation({
      variables: {
        id: id
      },
      refetchQueries: [{ query: getTasksQuery }]
    })
  }

  displayList() {
    //pulls data out from response of getTasksQuery
    let data = this.props.data
    if(data.loading === true) {
      return (<div>Loading Data...</div>)
    }
    else if (data.loading === false) {
      //turns each task in data into html to display
      return data.tasks.map((item) => {
        //makes tasks green if marked as complete
        if(item.completed){
          return(
            <div>
            <li key = {item.id}><span style={{color: "green"}}> {item.title} </span>
            <button onClick = {() => this.changeCompleted(item.id)}>
              Mark Incomplete
            </button>
            <button onClick = {() => this.deleteTask(item.id)}>
              Delete
            </button>
            </li>
            </div>
          )
        }
        //incomplete items have default text color
        else{
          return(
          <div>
          <li key = {item.id}> {item.title}
          <button onClick = {() => this.changeCompleted(item.id)}>
            Mark Complete
          </button>
          <button onClick = {() => this.deleteTask(item.id)}>
            Delete
          </button>
          </li>
          </div>
          )
        }
      })
    }
    /* else {
      console.log("loading status: ",data.loading)
      return(data.loading)
    } */
  }

  render() {
    return (
      <div>
        <ul>
          {this.displayList()}
        </ul>
      </div>
    );
  }
}

export default compose (
  graphql(getTasksQuery),
  graphql(deleteTaskMutation, {name: 'deleteTaskMutation'}),
  graphql(changeCompletedMutation, {name: 'changeCompletedMutation'})
)(ListTasks);