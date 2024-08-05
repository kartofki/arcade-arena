import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import useAuthStore from '../store/authStore';

const useLogout = () => {
	const [signOut, isLoggingOut, error] = useSignOut(auth);

	const logoutUser = useAuthStore((state) => state.logout);

	const handleLogout = async () => {
		try {
			await signOut();
			localStorage.removeItem("user-info");
			logoutUser();
		} catch (error) {
			console.log(error.message);
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useLogout;