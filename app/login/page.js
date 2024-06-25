import { getLoggedInUser } from "@/lib/loggedin-user";
import LoginForm from "./_components/login-form";
import SocialLogins from "./_components/social-logins";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user = await getLoggedInUser();
  if (user?.email) {
    return redirect("/");
  }

  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <LoginForm />
        <SocialLogins />
      </div>
    </div>
  );
};
export default LoginPage;

