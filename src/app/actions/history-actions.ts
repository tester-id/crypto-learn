"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveHistory(data: {
  method: string;
  type: string;
  input: string;
  output: string;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, message: "Unauthorized: Please log in again." };
  }

  try {
    // Locate user ID based on session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return { success: false, message: "Account not found." };

    await prisma.history.create({
      data: {
        userId: user.id,
        method: data.method,
        type: data.type, // 'encrypt' or 'decrypt'
        input: data.input,
        output: data.output,
      },
    });

    // Revalidate paths to refresh the UI history list
    revalidatePath("/encrypt"); 
    revalidatePath("/decrypt");
    revalidatePath("/history");

    return { success: true, message: "Activity successfully logged to history!" };
  } catch (error) {
    console.error("Save history error:", error);
    return { success: false, message: "Server error: Failed to sync activity." };
  }
}

export async function deleteHistory(id: string) {
  const session = await auth();
  if (!session?.user?.email) return { success: false, message: "Unauthorized access." };

  try {
    await prisma.history.delete({
      where: { id },
    });

    // Refresh all relevant cache paths
    revalidatePath("/history");
    revalidatePath("/encrypt");
    revalidatePath("/decrypt");
    
    return { success: true, message: "Log entry deleted successfully." };
  } catch (error) {
    console.error("Delete history error:", error);
    return { success: false, message: "Database error: Could not remove log entry." };
  }
}