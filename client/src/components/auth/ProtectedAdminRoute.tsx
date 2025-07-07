
interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  // const router = useRouter();
  // const { user, isLoading } = useAuth();

  // useEffect(() => {
  //   if (!isLoading && (!user || user.role !== "ADMIN")) {
  //     router.push("/login");
  //   }
  // }, [user, isLoading, router]);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  //     </div>
  //   );
  // }

  // if (!user || user.role !== "ADMIN") {
  //   return null;
  // }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
