/* eslint-disable no-undef */
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return null;

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data.to && data.message && data.subject) {
        // const to = data.to;
        const subject = data.subject;
        const message = data.message;

        const sentInfo = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "ruhul7571@gmail.com",
          subject: subject,
          react: EmailTemplate({ message }),
        });
        return sentInfo;
      } else {
        new Promise((reject) => {
          return reject(
            new Error(
              `Couldn't send email, please check the ${JSON.stringify(data)}.`
            )
          );
        });
      }
    })
  );
  return response;
};

