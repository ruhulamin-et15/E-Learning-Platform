import { getLoggedInUser } from "@/lib/loggedin-user";
import { SignupForm } from "../_components/signup-form";
import { redirect } from "next/navigation";

const RegisterPage = async ({ params: { role } }) => {
  const user = await getLoggedInUser();
  if (user?.email) {
    return redirect("/");
  }

  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignupForm role={role} />
      </div>
    </div>
  );
};
export default RegisterPage;

