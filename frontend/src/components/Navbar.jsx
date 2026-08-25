import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setShowPopup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            toast.success('Logout successfully')
        } catch (error) {
          
            toast.error('Logout failed')
        }
    };

    const firstLetter = user?.name?.charAt(0).toUpperCase() || '?';

    return (
        <div className="flex justify-between items-center px-8 py-5 bg-slate-900">
            <h1 className="text-2xl text-slate-100 font-bold">NoteNest</h1>

            <div className="relative" ref={popupRef}>
                <button
                    onClick={() => setShowPopup(!showPopup)}
                    className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold hover:bg-blue-600 transition"
                >
                    {firstLetter}
                </button>

                {showPopup && (
                    <div className="absolute right-0 mt-2 bg-slate-900 text-white rounded-xl shadow-lg p-4 w-56 z-50 border border-gray-700">
                        <p className="font-semibold truncate">{user?.name}</p>
                        <p className="text-sm text-gray-400 truncate mb-3">{user?.email}</p>
                        <hr className="border-gray-700 mb-3" />
                        <button
                            onClick={handleLogout}
                            className="w-full text-left text-red-400 hover:text-red-300 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;