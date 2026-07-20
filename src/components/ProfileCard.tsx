import { getUserProfile, logoutUser } from '@/services/profileService';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setUserId } from "@/features/userDataSlice";
const ProfilePopover = () => {
    const [isVisible, setIsVisible] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [userData, setUserData] = useState<any>({});
    const dispatch = useDispatch()
    const userId = sessionStorage.getItem("userId")
    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await getUserProfile(userId);
                setUserData(response.user);
                dispatch(setUserId(response.user.userId))
            }
            catch (error: any) {
                console.error("Error fetching user Profile data:", error);
            }
        }
        getUserData();
    }, [])

    const logout = async () => {
        try {
            const response = await logoutUser();
            if (response.success) {
                window.location.href = "/";
                sessionStorage.removeItem("userId")
            }
        } catch (error: any) {
            console.error("Error during logout:", error);
        }
    }
    return (
        <div className="relative" ref={popoverRef}>
            {/* Trigger Avatar */}
            <img
                src="PassportSizePhoto.jpeg"
                alt="Profile"
                className="h-9 w-9 rounded-full border-2 border-white dark:border-gray-800 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200"
                onClick={() => setIsVisible(!isVisible)}
            />

            {/* Popover */}
            {isVisible && (
                <div className="absolute right-0 top-12 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                    {/* Header / Profile Info */}
                    <div className="p-6 flex flex-col items-center border-b border-gray-100 dark:border-gray-700">
                        <div className="relative mb-4">
                            <img
                                src="PassportSizePhoto.jpeg"
                                alt="Profile"
                                className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 shadow-md"
                            />
                            <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        </div>

                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {userData.username}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {userData.email}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            User ID: <span className="font-mono">{userData.userId}</span>
                        </p>
                    </div>

                    {/* Action Menu */}
                    <div className="p-2">
                        <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 transition-colors">
                            👤 View Profile
                        </button>
                        <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 transition-colors">
                            ⚙️ Settings
                        </button>
                        <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl flex items-center gap-3 transition-colors">
                            💰 Billing
                        </button>

                        <div className="h-px bg-gray-100 dark:bg-gray-700 my-2 mx-2" />

                        <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl flex items-center gap-3 transition-colors" onClick={logout}>
                            ← Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePopover;