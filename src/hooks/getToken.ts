export function useToken(): string {
    // @ts-ignore: If token is none user will replace to auth page
    return localStorage.getItem('token')
}