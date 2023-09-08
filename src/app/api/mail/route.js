import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
const nGmail = process.env.NODEMAILER_EMAIL;
const pass = process.env.NODEMAILER_PASS;
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: true,

  auth: {
    user: nGmail,
    pass,
  },
});

export async function POST(req, res) {
  // const { searchParams } = new URL(req.url);
  // const email = searchParams.get("email");
  // const { email } = await req.json("email");
  const JsonBody = await req.json();
  let email = JsonBody["email"];
  const mailOptions = {
    from: nGmail,
    to: email,

    subject: `Message from `,
    text: "hii",
    html: "<b>You are logged in </b>",
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Email sending failed" },
      { status: 401 }
    );
  }
}
