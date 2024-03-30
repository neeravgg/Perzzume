import Spinner from '@/components/Loaders/Spinner';
import { useAppSelector } from '@/redux/store';
import { ReactNode } from 'react';
// import { useDispatch , useSelector} from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectRouteProps {
	isAllowed?: boolean;
	redirectPath?: string;
	children?: ReactNode;
	isCommon?: boolean;
}

const ProtectRoute = ({
	isAllowed,
	redirectPath = '/login',
	children,
	isCommon = true,
}: ProtectRouteProps) => {
	// const dispatch = useDispatch<AppDispatch>();
	const { checkServerLoader } = useAppSelector((state) => state.loaders);
	const token = true;
	// useEffect(() => {
	// 	dispatch(checkServer());
	// }, [dispatch]);

	if (checkServerLoader) {
		return <Spinner ServerLoader={true} />;
	} else {
		const isAuthTokenValid = isAllowed ? true : isCommon ? token : !token;

		return isAuthTokenValid ? (
			<>{children ? children : <Outlet />}</>
		) : (
			<Navigate to={redirectPath} replace />
		);
	}
};

export default ProtectRoute;
