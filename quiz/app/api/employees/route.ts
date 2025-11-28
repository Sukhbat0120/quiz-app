import { query } from "@/lib/Connectdb";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const res = await prisma.employees.findMany();
  return NextResponse.json(res);
  try {
    const res = await query("SELECT * FROM employees");
    console.log("RESPONSE!", res.rows);
    return NextResponse.json(res.rows);
  } catch (error) {
    console.log("ERROR", error);
  }
};
