import Todo from "../models/Todo.js";


export const newTaskController = async (req, res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            tags: req.body.tags,
            user: req.body.user,

        });

        const savedTodo = await newTodo.save();

        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: "Failed to add todo" });
    }
}

export const userTaskController = async (req, res) => {
    try {
        const userId = req.params.userId;

        const todos = await Todo.find({ user: userId });
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error retrieving todos:", error);
        res.status(500).json({ error: "Failed to retrieve todos" });
    }
};



export const taskIdController = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
};


export const todoDeleteController = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findByIdAndDelete(todoId);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
}

export const updateTodoController = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed, dueDate, priority, tags } = req.body;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        // Update the todo fields
        todo.title = title;
        todo.description = description;
        todo.completed = completed;
        todo.dueDate = dueDate;
        todo.priority = priority;
        todo.tags = tags;

        // Save the updated todo
        await todo.save();

        res.status(200).json(todo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Failed to update todo" });
    }
};

export const CompleteStatusController = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        // Update the completion status
        todo.completed = completed;

        // Save the updated todo
        await todo.save();

        res.status(200).json(todo);
    } catch (error) {
        console.error("Error updating todo completion status:", error);
        res.status(500).json({ error: "Failed to update completion status" });
    }
};

export const isPublicController = async (req, res) => {
    const { id } = req.params;
    const { isPublic } = req.body;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

       
        todo.isPublic = isPublic;

        // Save the updated todo
        await todo.save();

        res.status(200).json(todo);
    } catch (error) {
        console.error("Error updating todo completion status:", error);
        res.status(500).json({ error: "Failed to update completion status" });
    }
};

