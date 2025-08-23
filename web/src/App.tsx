import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xlfont-bold mb-4">Survey App</h1>
            <Outlet />
        </div>
    )
}
