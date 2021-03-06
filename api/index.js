const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const db = require('./database.json');


// To do consructor
class Todo {
    constructor(name, category) {
        this.id = uuid.v4(), 
        this.complete = false,
        this.name = name, 
        this.category = category, 
        this.lastModified = new Date().toISOString()
    }
}

// Category constructor
class Category {
    constructor(name) {
        this.id = uuid.v4(),
        this.lastModified = new Date().toISOString(),
        this.name = name
    }
}

// Get all todos or get all for a particular category
router.get('/todos', (req, res) => {
    try {
        const { category } = req.query;
        let returnList = category ? db.toDos.filter(e => e.category.name === category) : db.toDos;
        res.status(200).json(formatResponse({ status: 200, data: returnList }));
    } catch(error) {
        console.error(error);
        res.status(500).json(formatResponse({ status: 500, data: { exception: 'Internal server error', message: error.message } }));
    }
})

// Create todo
router.post('/todo', (req, res) => {
    try {
        const { name, category } = req.body;
        let catRecord = db.categories.find(e => e.name === category);
        if (!catRecord) {
            catRecord = new Category(category);
            db.categories.push(catRecord);
        }
        let newTodo = new Todo(name, catRecord);
        db.toDos.push(newTodo);
        res.status(200).json(formatResponse({ status: 200, data: newTodo }))
    } catch (error) {
        console.error(error);
        res.status(500).json(formatResponse({ status: 500, data: { exception: 'Internal server error', message: error.message } }))
    }
})

// Update existing todo
router.put('/todo/:id', (req, res) => {
    try {
        const { name, category, complete } = req.body;
        let toDoIndex = db.toDos.findIndex(e => e.id === parseInt(req.params.id));
        if (toDoIndex) {
            let catRecord = db.categories.find(e => e.name === category);
            if (!catRecord) {
                catRecord = new Category(category);
                db.categories.push(catRecord);
            }
            db.toDos[toDoIndex].name = name;
            db.toDos[toDoIndex].category = catRecord;
            db.toDos[toDoIndex].complete = complete;
            db.toDos[toDoIndex].lastModified = new Date().toISOString();
            res.status(200).json(formatResponse({ status: 200, data: db.toDos[toDoIndex] }));
        } else {
            res.status(404).json(formatResponse({ status: 404, data: `There is no item with the id of ${req.params.id} in the database`}));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(formatResponse({ status: 500, data: { exception: 'Internal server error', message: error.message } }));
    }
})

// Delete todo
router.delete('/todo/:id', (req, res) => {
    try {
        const { id } = req.params;
        let toDoIndex = db.toDos.findIndex(e => e.id === parseInt(id));
        if (toDoIndex) {
            db.toDos.splice(toDoIndex, 1);
            res.status(200).json(formatResponse({status: 200, data: "Item successfully deleted"}));
        } else {
            res.status(404).json(formatResponse({ status: 404, data: `There is no item with the id of ${req.params.id} in the database`}));
        }
    }catch(error) {
        console.error(error);
        res.status(500).json(formatResponse({ status: 500, data: { exception: 'Internal server error', message: error.message } }));
    }
})

// Get all categories
router.get('/categories', (req, res) => {
    try {
        res.status(200).json(formatResponse({ status: 200, data: db.categories }));
    } catch(error) {
        console.error(error);
        res.status(500).json(formatResponse({ status: 500, data: { exception: 'Internal server error', message: error.message } }));
    }
})

// Create new category
router.post('/category', (req, res) => {
    try {
        const {category} = req.body;
        const categoryExists = db.categories.find(e => e.name === category);
        if (categoryExists) {
            res.status(400).json(formatResponse({status: 400, data: `${category} already exists!`}));
        } else {
            let newCategory = new Category(category);
            db.categories.push(newCategory);
            res.status(200).json(formatResponse({status: 200, data: newCategory}));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(formatResponse({ status: 500, data: { exception: 'Internal server error', message: error.message } }));
    }
})

// Update existing category
router.put('/category/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        let catIndex = db.categories.findIndex(e => e.id === parseInt(id));
        if (catIndex) {
            db.categories[catIndex].name = name;
            db.categories[catIndex].lastModified = new Date().toISOString();
            res.status(200).json(formatResponse({ status: 200, data: db.categories[catIndex] }));
        } else {
            res.status(404).json(formatResponse({ status: 404, data: `There is no category with the id of ${req.params.id} in the database`}));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(formatResponse({ status: 500, data: { exception: 'Internal server error', message: error.message } }))
    }
})

// Delete category
router.delete('/category/:id', (req, res) => {
    try {
        const { id } = req.params;
        let catIndex = db.categories.findIndex(e => e.id === parseInt(id));
        if (catIndex) {
            db.categories.splice(catIndex, 1);
            res.status(200).json(formatResponse({status: 200, data: "Item successfully deleted"}));
        } else {
            res.status(404).json(formatResponse({ status: 404, data: `There is no item with the id of ${req.params.id} in the database`} ));
        }
    }catch(error) {
        console.error(error);
        res.status(500).json(formatResponse({ status: 500, data: { exception: 'Internal server error', message: error.message }}));
    }
})

// I am a teapot!
router.get('/coffee', (req, res) => {
    res.status(418).json('Server refuses to brew coffee because it is, permanently, a teapot.');
})

// Format data for response
const formatResponse = (e) => {
    return {
        success: e.status === 200 ? true : false, 
        data: e.data
    }
}

module.exports = router;