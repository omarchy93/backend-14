import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import { TokenCookie } from "@/app/lib/tokenCookie";

export async function POST(req, res) {
  const JsonBody = await req.json();
  let email = JsonBody["email"];
  let password = JsonBody["password"];
  //Data Checking
  if (password === "password") {
    let Cookie = await TokenCookie(email);

    return NextResponse.json(
      { status: true, message: "Request completed" },
      { status: 200, headers: Cookie }
    );
  } else {
    return NextResponse.json({ status: false, message: "Request Fail" });
  }
}

// export async function GET(req, res) {
//   cookies().delete("token");
//   return NextResponse.json({ status: true, message: "Request Completed" });
// }

export async function GET(request) {
  try {
    let Cookie = await TokenCookie();
    const cookieStore = cookies(Cookie);
    const token = cookieStore.get("token");
    cookies().delete(token);

    return NextResponse.json({ status: true, message: "logout" });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "logout fail",
    });
  }
}
