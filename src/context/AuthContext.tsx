import { createContext, useContext, useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AuthContext = createContext({
  user: null,
  loading: true,
  handleSignIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {},
  handleSignOut: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const route = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [session]);

  const handleSignIn = async (credentials: {
    email: string;
    password: string;
  }) => {
    const res = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
    if (res.error && res.error === "CredentialsSignin") {
      toast.error("Credenciais inválidas");
    } else {
      route.push("/dashboard");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <AuthContext.Provider
        value={{ user, loading, handleSignIn, handleSignOut }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
