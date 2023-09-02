import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getSession() {
    return getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if(!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
            /*select: {
                name: true,
                isAdmin: true,
                favoriteIds: true,
                reservations: true,
                accounts: true,
                image: true,
            }*/
        })

        if(!currentUser) {
            return null;
        }

        return currentUser;
    }
    catch (error: any) {
        return null;
    }
}