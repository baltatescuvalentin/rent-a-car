import { Car, User, Reservation } from '@prisma/client';

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeUserSelected = Omit<SafeUser, 
    "email" | "emailVerified" | "hashedPassword" | "createdAt" | "updatedAt" >

export type SafeCar = Omit<Car, "color">
& {
  color: string;
};