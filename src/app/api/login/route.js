import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import { TokenCookie } from "@/app/lib/tokenCookie";

export async function POST(req, res) {
  const JsonBody = await req.json();
  let email = JsonBody["email"];
  let password = JsonBody["password"];
  //Data Checking
  if (email === "omarfarukchy93@gmail.com" && password === "123") {
    let Cookie = await TokenCookie(email);

    return NextResponse.json(
      { status: true, message: "Request completed" },
      { status: 200, headers: Cookie }
    );
  } else {
    return NextResponse.json({ status: false, message: "Request Fail" });
  }
}

export async function GET(req, res) {
  await TokenCookie();
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  cookies().delete("token");
  // return NextResponse.json({ status: true, message: "Request Completed" });
  return NextResponse.json(
    { status: true, message: "Logout" },
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Set-Cookie": `token=${token.value}; Path=/; Max-Age=0`,
      },
    }
  );
}

// export async function GET(request) {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get("token");
//     cookies().delete("token");

//   } catch (error) {
//     return NextResponse.json({
//       status: 400,
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//   }
// }
