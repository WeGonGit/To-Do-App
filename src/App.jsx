import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './components/Header';
import { TaskItem } from './components/TaskItem';
import { AddTask } from './components/AddTask';

// Mock Initial Data
const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Update documentation for V2 release',
    description: 'Review all API endpoints and ensure they match the latest implementation.',
    completed: false,
    category: 'DESIGN SYSTEM',
    dueDate: 'Tomorrow',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Implement dark mode for dashboard',
    description: 'Use CSS variables for a seamless theme switching experience.',
    completed: false,
    category: 'MARKETING SITE',
    dueDate: 'Today',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Refactor auth middleware',
    description: 'Switch to the new stable version of Next.js middleware.',
    completed: false,
    category: 'MOBILE APP',
    dueDate: 'Oct 24',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Conduct user interview session #4',
    description: 'Focus on the onboarding flow and initial setup friction.',
    completed: true,
    category: 'PERSONAL',
    dueDate: 'Done',
    priority: 'low'
  }
];

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pendingCount = tasks.filter(t => !t.completed).length;

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const addTask = (newTask) => {
    setTasks(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        completed: false,
        ...newTask
      },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl relative">
        <Header pendingCount={pendingCount} />

        <div className="space-y-4 mb-24">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>

        <AddTask
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addTask}
        />
      </div>
    </div>
  );
}

export default App;
