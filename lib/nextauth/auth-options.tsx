import { NextAuthOptions, RequestInternal } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { env } from 'process';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';

export const Options: NextAuthOptions = {
  secret: env.nextAuthSecret,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      authorize: async function (
        credentials: Record<string, string> | undefined,
        req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>,
      ) {
        console.log('authorize');

        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid credentials');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        const isCorrectedPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isCorrectedPassword) {
          throw new Error('Invalid credentials');
        }
        const { password, ...userWithoutPwd } = user;

        console.log('AUTH AUTHORIZE: \n', userWithoutPwd);

        return userWithoutPwd;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      console.log(
        'AUTH CALLBACK SESSION:',
        '\nsession: \n',
        session,
        '\n token: \n',
        token,
        '\n user: \n',
        user,
      );
      if (session?.user) {
        // session.user.name = 'hallo';
        session.user.image =
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzuTEj0AfQvO5i3eDKbGV7JmE3LJ_GC2kIw&s';
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      console.log(
        'AUTH CALLBACK JWT:',
        '\n token: \n',
        token,
        '\n user: \n',
        user,
      );
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1year
  },
};
