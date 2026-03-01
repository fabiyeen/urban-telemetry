import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 🔒 The Secret Key (In a real company, this goes in your .env file)
const API_SECRET = "super_secret_tangerang_key_123";

export async function POST(request: Request) {
  try {
    // 1. THE BOUNCER: Check if the request has the secret password
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${API_SECRET}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Nice try, hacker!" }, 
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sensor_id, lat, lng, value } = body;

    // 2. Save the new data to Aiven
    const newRecord = await prisma.telemetry.create({
      data: { sensor_id, lat, lng, value },
    });

    // 3. THE JANITOR: Delete records older than 2 hours so your free database never fills up
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    await prisma.telemetry.deleteMany({
      where: { created_at: { lt: twoHoursAgo } }
    });

    return NextResponse.json({ success: true, data: newRecord }, { status: 201 });
    
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save data." }, 
      { status: 500 }
    );
  }
}