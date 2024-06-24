"use client";

import { ceredntialLogin } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await ceredntialLogin(formData);

      if (response.error) {
        console.error(response.error);
      } else {
        router.push("/courses");
        toast.success("User Login Successfull");
      }
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                {`${loading ? "Logging" : "Login"}`}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Dont have an account?{" "}
            <p>
              Register as{" "}
              <Link href="/register/instructor" className="underline">
                Instructor
              </Link>{" "}
              or{" "}
              <Link href="/register/student" className="underline">
                Student
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;

