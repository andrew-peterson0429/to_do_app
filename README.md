# to_do_app
 To do app for DGM 3760

# Todos
Located in api/index.js
https://localhost3030/


## Get all Todos by category
Get all todos by category on line: 27
Using a try, catch: Recieves and displays every todo item within a specific category.

## Post Todos
Post(add) new todos on line: 39
Using a try, catch: Creates a new task by recieving user input in req.body and pushes it to the object array.

## Put Todos
Put(update) todos on line: 57
Using a try, catch: Updates a current todo and changes the values based on input and then pushing updated value.

## Delete Todos
Delete todos on line: 82
Using a try, catch:  Locate desired task. If found, the taskwill be removed from the main object array. If task is not found, an error message will be sent.

# Categories

## Get Categories
Get all categories on line: 99
Using a try, catch: Gets every category available in the object array.

## Post Category
Post(add) category on line: 109
Using a try, catch: from user input for req.body and pushing it onto the object array.

## Put Category
Put(update) todos on line: 127
Using a try, catch: Updates a current category by changing its value based on user input in req.body to replace the data.

## Delete Category
Delete category on line: 146
Using a try, catch: Locates desired category and is removed by using splice. If cateory is not found, will return an error message.