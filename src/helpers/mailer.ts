import nodemailer from "nodemailer";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt";

export const sendMailer = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);
    // TODO: to some configuration
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifiedToken: hashToken,
          verifiedTokenExpire: Date.now() + 360000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashToken,
          forgetPasswordTokenExpire: Date.now() + 360000,
        },
      });
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 2525,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    const mailOption = {
      from: "arshadwebdeveloper10@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "verify the email" : "reset the password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashToken}
            </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOption);

    console.log("message has send");
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
