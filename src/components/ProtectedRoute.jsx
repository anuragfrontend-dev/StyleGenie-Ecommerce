import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({children}){
  
  const user=localStorage.getItem('loggedInUser');
  const location=useLocation();
  

  if(user){
    return children;
  }
  
  return <Navigate to="/Login" state={{ from: location }} replace />
}