import { Clock, SlidersHorizontal } from "lucide-react";

export function Header({ pendingCount }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">All Tasks</h1>
                <p className="text-gray-500 mt-2 text-lg">
                    You have <span className="font-semibold text-gray-700">{pendingCount} pending tasks</span> for today.
                </p>
            </div>

            <button className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl font-medium transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Sort by
            </button>
        </div>
    );
}
