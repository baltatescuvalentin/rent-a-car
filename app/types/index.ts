import { Car, User, Reservation, Prisma } from '@prisma/client';

export interface FormRegister {
  requiredMsg?: string;
  minValue?: number;
  pattern?: {
    value: RegExp,
    message: string,
  },
  minLength?: {
    value: number,
    message: string,
  },
  validate?: (val: string) => boolean | string,
}


export type SafeReservation = Omit<Reservation,
  "startDate" | "endDate" | "createdAt"> & {
    startDate: string,
    endDate: string,
    createdAt: string,
    car: Car,
  }

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeUserSelected = Omit<User, 
    "email" | "emailVerified" | "hashedPassword" | "createdAt" | "updatedAt" >