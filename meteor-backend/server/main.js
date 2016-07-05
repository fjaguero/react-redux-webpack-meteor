// declare MongoDB collection here
//
// Read more: http://guide.meteor.com/collections.html
Todos = new Meteor.Collection('todo');

const Schemas = {};

Schemas.Todo = new SimpleSchema({
  message: {
    type: String,
    label: "Text",
    max: 200
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
     type: Date,
     autoValue: function() {
       if (this.isUpdate) {
         return new Date();
       }
     },
     denyInsert: true,
     optional: true
   },
  finished: {
    type: Boolean,
    label: "Status of a todo",
    defaultValue: false
  }
})

Todos.attachSchema(Schemas.Todo);

// We can publish some data (here all)
// we will be able to subscribe to the data later in the client app
// remember that this is not secured, all can subscribe to all data from the client side, just demo purposes
//
// Read more: http://guide.meteor.com/data-loading.html
Meteor.publish('todo', function () {
    return Todos.find();
});

// We can also use server side methods and call them from our client app
// here we just fetch all documents from the collection
// again, remember that this is not secured, all can call it from the client side, just demo purposes
//
// Read more: http://guide.meteor.com/methods.html
Meteor.methods({
    getTodo(id) {
        return Todos.findOne(id);
    },
    getTodos() {
        return Todos.find().fetch();
    },
    addTodo(message) {
        return Todos.insert({
          message
        });
    },
    removeTodo(id) {
        return Todos.remove({_id: id});
    },
    editTodo(id, finished) {
        return Todos.update({_id: id}, {$set: {finished: finished}});
    }
});


// Deny all client-side updates on the Lists collection
// Read more about security stuff: http://guide.meteor.com/security.html
Todos.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
