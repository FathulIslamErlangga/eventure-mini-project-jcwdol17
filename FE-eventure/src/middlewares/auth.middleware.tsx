import { useAuthGuard } from "@/hooks/authGuard.hooks";
import { ReactElement } from "react";

const withAuth = (
  Component: React.FC,
  allowedRoles: string[]
) => {
  return function ProtectedComponent(props: any) {
    const { isAuthorized, loading } = useAuthGuard(allowedRoles);
    if (loading) return <p>Loading...</p>;
    if (!isAuthorized) return null;
    return <Component {...props} />;
  };
};

export default withAuth;
