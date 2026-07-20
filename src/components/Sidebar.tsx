import { ArrowLeftRight, CircleDollarSign, House, Settings } from "lucide-react";
import { BiCategoryAlt } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const navItems = [
        { name: "Home", path: "/dashboard", icon: <House /> },
        { name: "Transactions", path: "/dashboard/transactions", icon: <ArrowLeftRight /> },
        { name: "Categories", path: "", icon: <BiCategoryAlt className="h-6 w-6" /> },
        { name: "Budgets", path: "", icon: <CircleDollarSign /> },
        { name: "Settings", path: "", icon: <Settings /> },
    ]

    return (
        <div className="flex">
            {/* Toggle Button (Mobile) */}
            <button
                className="p-2 m-2 text-white bg-gray-800 rounded md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen bg-gray-900 text-white w-56 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 md:translate-x-0 md:static`}
            >
                <div className="p-3 border-b border-gray-700 flex items-center gap-3">
                    <img
                        src="/expense_tracker_img-removebg-preview.png"
                        alt="Logo"
                        className="h-9 w-9 object-contain"
                    />
                    <p className="text-lg font-semibold tracking-wide">
                        Expense Tracker
                    </p>
                    <button
                        className="p-2 m-2 text-white bg-gray-800 rounded md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>
                </div>

                <ul className="p-4 space-y-2">
                    {
                        navItems.map((item) => (
                            <li
                                key={item.name}
                                className="p-2 rounded hover:bg-gray-700 cursor-pointer"
                                onClick={() => { navigate(item.path) }}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}