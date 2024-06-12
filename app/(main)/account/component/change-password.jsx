"use client";
import { changePassword } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({ email }) => {
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setPasswordState({ ...passwordState, [key]: value });
  };

  async function doPasswordChange(e) {
    e.preventDefault();
    try {
      await changePassword(
        email,
        passwordState?.oldPassword,
        passwordState?.newPassword
      );
      toast.success("Password changed successfully");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>
      <form onSubmit={doPasswordChange}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              id="oldPassword"
              placeholder="Old password"
              name="oldPassword"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              id="newPassword"
              placeholder="New password"
              name="newPassword"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">Re-type New password :</Label>
            <Input
              type="password"
              placeholder="Re-type New password"
              name="cpassword"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <Button className="mt-5 cursor-pointer" type="submit">
          Save password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
