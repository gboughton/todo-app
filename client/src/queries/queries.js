import { gql } from 'apollo-boost';

// defining gql queries
const getTasksQuery = gql`
    {
        tasks {
            id
            title
            completed
            canEdit
        }
    }`

const addTaskMutation = gql`
    mutation($title: String!){
        addTask(title: $title){
            id
            title
            completed
            canEdit
        }
    }`

const changeCompletedMutation = gql`
    mutation($id: ID!){
        changeCompleted(id: $id){
            id
            title
            completed
            canEdit
        }
    }`

const updateTaskMutation = gql`
    mutation($id: ID!, $title: String!){
        updateTask(id: $id, title: $title){
            id
            title
            completed
            canEdit
        }
    }`

const deleteTaskMutation = gql`
    mutation($id: ID!){
        deleteTask(id: $id)
    }`

export {getTasksQuery, addTaskMutation,
    changeCompletedMutation, updateTaskMutation,
    deleteTaskMutation};