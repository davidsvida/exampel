const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dbUrl = '<YOUR-MONGODB-CONNECTION-STRING>';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const TaskSchema = new mongoose.Schema({
    taskText: { type: String, required: true },
});

const Task = mongoose.model('Task', TaskSchema);

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        res.status(404).json({ message: 'Task not found' });
    } else {
        res.json(task);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));