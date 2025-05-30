import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "./store/hooks"; 

interface JwtPayload {
  sub: string;
  role: "CUSTOMER" | "CRAFTSMAN" | "COMPANY";
}

interface RoleProtectedRouteProps {
  allowedRoles: Array<JwtPayload["role"]>;
  redirectTo?: string;
}

export default function RoleProtectedRoute({
  allowedRoles,
  redirectTo = "/login",
}: RoleProtectedRouteProps) {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  // Caso 1: Usuário não está logado
  if (!token) {
    console.log("Acesso negado (sem token no Redux). Redirecionando para:", redirectTo);
    return (
      <Navigate
        to={redirectTo}
        // Passa a mensagem e a página que o usuário tentou acessar
        state={{
          toastMessage: "Para acessar esta página, você precisa estar logado.",
          type: "info",
          from: location,
        }}
        replace
      />
    );
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // Caso 2: Usuário está logado e tem a permissão correta
    if (allowedRoles.includes(decoded.role)) {
      return <Outlet />;
    } else {
      // Caso 3: Usuário está logado, mas NÃO tem a permissão correta
      console.log(`Acesso negado (role '${decoded.role}' inválida). Redirecionando para a HOME.`);
      // Redireciona para a home page, pois o usuário já está logado
      return (
        <Navigate
          to="/" // <-- **CORREÇÃO PRINCIPAL AQUI**
          state={{
            toastMessage: "Acesso negado: você não tem permissão para ver esta página.",
            type: "error",
          }}
          replace
        />
      );
    }
  } catch (error) {
    // Caso 4: O token existe mas é inválido/corrompido
    console.error("Erro ao decodificar o token:", error);
    return (
      <Navigate
        to={redirectTo}
        state={{
          toastMessage: "Sua sessão é inválida ou expirou. Por favor, faça login novamente.",
          type: "error",
          from: location,
        }}
        replace
      />
    );
  }
}