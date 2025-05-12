
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import Logo from "@/components/shared/Logo";

const RegisterScreen = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white px-4 py-10 animate-fade-in">
      <div className="mt-10 mb-8 text-center">
        <Link to="/">
          <Logo size="medium" className="inline-block" />
        </Link>
      </div>
      
      <div className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-md">
          <AuthForm mode="register" />
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
