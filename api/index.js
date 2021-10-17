const express = require('express');
const router = express.Router();
const db = require('./database.json');

// To do consructor
class Todo {
    constructor(name, category) {
        this.id = new Date().getTime(), 
        this.complete = false,
        this.name = name, 
        this.category = category
    }
}

// Get all todos or get all for a particular category
router.get('/todos', (req, res) => {
    try {
        let returnList = req.query.category ? db.toDos.filter(e => e.category === req.query.category) : db.toDos;
        res.status(200).json(formatResponse({ status: 200, data: returnList }))
    } catch(error) {
        res.status(500).json(formatResponse({ status: 500, data: error }))
    }
})

// Create todo
router.post('/todo', (req, res) => {
    try {
        let newTodo = new Todo(req.body.name, req.body.category);
        db.toDos.push(newTodo);
        res.status(200).json(formatResponse({ status: 200, data: newTodo }))
    } catch (error) {
        res.status(500).json(formatResponse({ status: 500, data: error }))
    }
})

// Update existing todo
router.put('/todo/:id', (req, res) => {
    try {
        let toDoIndex = db.toDos.findIndex(e => e.id === parseInt(req.params.id));
        if (toDoIndex) {
            db.toDos[toDoIndex].name = req.body.name;
            db.toDos[toDoIndex].category = req.body.category;
            db.toDos[toDoIndex].complete = req.body.complete;
            res.status(200).json(formatResponse({ status: 200, data: db.toDos[toDoIndex] }))
        } else {
            res.status(404).json(formatResponse({ status: 404, data: `There is no item with the id of ${req.params.id} in the database`}));
        }
    } catch (error) {
        res.status(500).json(formatResponse({ status: 500, data: error }))
    }
})

// Delete todo
router.delete('/todo/:id', (req, res) => {
    try {
        let toDoIndex = db.toDos.findIndex(e => e.id === parseInt(req.params.id));
        if (toDoIndex) {
            db.toDos.splice(toDoIndex, 1);
            res.status(200).json(formatResponse({status: 200, data: "Item successfully deleted"}))
        } else {
            res.status(404).json(formatResponse({ status: 404, data: `There is no item with the id of ${req.params.id} in the database`}));
        }
    }catch(error) {
        res.status(500).json(formatResponse({ status: 500, data: error }))
    }
})

// Get all categories
router.get('/categories', (req, res) => {
    try {
        res.status(200).json(formatResponse({ status: 200, data: db.categories }))
    } catch(error) {
        res.status(500).json(formatResponse({ status: 500, data: error }))
    }
})

// Create new category
router.post('/category', (req, res) => {
    
})

// Update existing category
router.put('/category', (req, res) => {
    
})

// Delete category
router.delete('/category', (req, res) => {
    
})

// Format data for response
const formatResponse = (e) => {
    return {
        success: e.status === 200 ? true : false, 
        data: e.data
    }
}

module.exports = router;