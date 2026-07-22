import { SignJWT, jwtVerify } from 'jose'
import { useRuntimeConfig } from '#imports'

function secretKey() {
   return new TextEncoder().encode(useRuntimeConfig().JWT_SECRET)
}

export function signUserToken(userId: number) {
   return new SignJWT({ sub: String(userId) })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secretKey())
}

export async function verifyUserToken(token: string) {
   const { payload } = await jwtVerify(token, secretKey())
   return payload
}
