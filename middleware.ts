export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        "/favorites",
        "/dashboard/:path",
        "/reservations"
    ]
}