// import React, { ReactNode } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

// interface PrivateRouterProps {
//   children: ReactNode;
// }

// export const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
//   const location = useLocation();
//   const { auth } = useAuth();

//   return auth ? (
//     <>{children}</>
//   ) : (
//     <Navigate to="/" replace state={{ from: location }} />
//   );
// };
