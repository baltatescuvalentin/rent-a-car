import bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';
import { AuthOptions } from 'next-auth';
import CredentialProvier from 'next-auth/providers/credentials';
import GoogleProvide from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/libs/prismadb';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialProvier({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: {
                    label: 'password',
                    type: 'password',
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })

                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword = bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if(!isCorrectPassword) {
                    throw new Error('Invalid password')
                }

                return user;
            }
        }),
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions);