const Task = require('../model/task');
const mongoose = require('mongoose');

//creates functions defined in schema.js
const resolvers = {
    Query: {
        tasks(root, args){
            return Task.find();
        },
        getTaskByID(root, { id }){
            return Task.findById(id);
        }
    },

    Mutation: {
        async addTask(root, { title }) {
            return await Task.create({ title: title });
        },
        async changeCompleted(root, { id }){
            let doneTask = await Task.findById(id);
            doneTask.completed = !doneTask.completed;
            return doneTask.save();
        },
        async updateTask(root, { id, title }){
            let updatedTask = await Task.findById(id);
            updatedTask.title = title;
            return updatedTask.save();
        },
        async deleteTask(root, { id }){
            return await Task.findByIdAndRemove(id);
        }
    }
};

module.exports = resolvers