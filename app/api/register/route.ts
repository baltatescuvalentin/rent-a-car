import { NextResponse } from "next/dist/server/web/spec-extension/response";
import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const body = await request.json();
    const {
        email,
        name,
        password,
        isAdmin,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
            isAdmin,
        }
    });

    return NextResponse.json(user);
}