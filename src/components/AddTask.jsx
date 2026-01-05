import { useState } from 'react';
import { X, Calendar as CalendarIcon, Tag, Flag } from 'lucide-react';
import { cn } from '../lib/utils';

export function AddTask({ isOpen, onClose, onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState({ name: 'Personal', color: 'bg-gray-100 text-gray-600' });
    const [priority, setPriority] = useState('low');
    const [dueDate, setDueDate] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd({
            title,
            description,
            category: category.name,
            priority,
            dueDate: dueDate || 'Today' // default
        });

        // Reset and close
        setTitle('');
        setDescription('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">New Task</h2>
                        <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="What needs to be done?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-lg font-semibold placeholder:text-gray-400 border-none focus:ring-0 p-0"
                                autoFocus
                            />
                        </div>

                        <div>
                            <textarea
                                placeholder="Description (optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full text-gray-600 placeholder:text-gray-400 border-none focus:ring-0 p-0 resize-none h-20"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                            {/* Simplified inputs for demo */}
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200 cursor-pointer hover:bg-gray-100">
                                <CalendarIcon className="w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Due Date"
                                    className="bg-transparent border-none p-0 w-20 text-sm focus:ring-0"
                                    value={dueDate}
                                    onChange={e => setDueDate(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200 cursor-pointer hover:bg-gray-100">
                                <Flag className="w-4 h-4" />
                                <select
                                    value={priority}
                                    onChange={e => setPriority(e.target.value)}
                                    className="bg-transparent border-none p-0 text-sm focus:ring-0 cursor-pointer"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!title.trim()}
                            className="px-6 py-2 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
