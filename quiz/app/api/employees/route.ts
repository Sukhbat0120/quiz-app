import { query } from "@/lib/Connectdb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await query("SELECT * FROM employees");
    console.log("RESPONCE!", res.rows);
    return NextResponse.json(res.rows);
  } catch (error) {
    console.log("ERROR", error);
  }
};
