"use client";
import { updateUserInfo } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ContactInfo = ({ phone, website, email }) => {
  const [infoState, setInfoState] = useState({
    phone: phone,
    website: website,
  });

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    setInfoState({
      ...infoState,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserInfo(email, infoState);
      toast.success("Contact info updated successfully");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No. :</Label>
            <Input
              name="phone"
              id="phone"
              type="phone"
              value={infoState.phone}
              onChange={handleChange}
              placeholder="Phone :"
            />
          </div>
          <div>
            <Label className="mb-2 block">Website :</Label>
            <Input
              name="website"
              id="website"
              type="url"
              value={infoState.website}
              onChange={handleChange}
              placeholder="Url :"
            />
          </div>
        </div>
        <Button className="mt-5" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default ContactInfo;
