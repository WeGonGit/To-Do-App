import { useState, useRef, useEffect } from "react";
import { Circle, CheckCircle2, MoreHorizontal, Calendar, Trash2 } from "lucide-react";
import { cn } from "../lib/utils";
import { Badge } from "./Badge";

export function TaskItem({ task, onToggle, onDelete }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const priorityColor = {
        high: "red",
        medium: "blue",
        low: "green",
    };

    // Click outside to close menu
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200">
            {/* Left accent border */}
            <div
                className={cn(
                    "absolute left-0 top-4 bottom-4 w-1.5 rounded-r-md",
                    task.priority === "high" ? "bg-red-500" :
                        task.priority === "medium" ? "bg-blue-500" : "bg-green-500",
                    task.completed && "bg-gray-300"
                )}
            />

            <div className="flex items-start gap-4 pl-3">
                <button
                    onClick={() => onToggle(task.id)}
                    className="mt-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-gray-400" />
                    ) : (
                        <Circle className="w-6 h-6" />
                    )}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h3
                            className={cn(
                                "text-lg font-bold text-gray-900 leading-tight",
                                task.completed && "text-gray-400 line-through"
                            )}
                        >
                            {task.title}
                        </h3>

                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <MoreHorizontal className="w-5 h-5" />
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 top-8 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-10 animate-in fade-in zoom-in-95 duration-100">
                                    <button
                                        onClick={() => {
                                            onDelete(task.id);
                                            setShowMenu(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <p className={cn("mt-1 text-gray-500 text-sm", task.completed && "text-gray-300")}>
                        {task.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                        <Badge variant="default" className="bg-gray-100 text-gray-600">
                            {task.category}
                        </Badge>

                        <div className="flex items-center text-gray-400 text-xs font-medium gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {task.dueDate}
                        </div>

                        {task.priority === 'high' && (
                            <Badge variant="red" className="bg-red-50 text-red-600">High Priority</Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
