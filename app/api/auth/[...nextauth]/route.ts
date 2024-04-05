import NextAuth, { NextAuthOptions, RequestInternal } from 'next-auth';
import { Options } from '@/lib/nextauth/auth-options';

const handler = NextAuth(Options);

export { handler as GET, handler as POST };
