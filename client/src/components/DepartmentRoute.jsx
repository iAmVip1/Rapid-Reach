import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function DepartmentRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isHospital ? <Outlet /> : <Navigate to='/not-allowed' />;
}