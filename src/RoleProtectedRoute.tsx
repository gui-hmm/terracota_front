import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  role: "CUSTOMER" | "CRAFTSMAN" | "COMPANY";
}

interface RoleProtectedRouteProps {
  allowedRoles: JwtPayload["role"][];
  redirectTo?: string;
}

export default function RoleProtectedRoute({
  allowedRoles,
  redirectTo = "/login",
}: RoleProtectedRouteProps) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("Acesso negado: você não tem permissão para acessar esta página.");
    return <Navigate to={redirectTo} />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (allowedRoles.includes(decoded.role)) {
      return <Outlet />;
    } else {
      alert("Acesso negado: você não tem permissão para acessar esta página.");
      return <Navigate to={redirectTo} />; 
    }

  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return <Navigate to={redirectTo} />;
  }
}
