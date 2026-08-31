import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import Layout from './Layout';

const ProtectedRoute=({children})=>{
    const {user,loading }= useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-700 flex items-center justify-center text-white">
                <p>Loading...</p>
            </div>
        )}
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Layout>
        {children}
    </Layout>

    
};

export default ProtectedRoute;