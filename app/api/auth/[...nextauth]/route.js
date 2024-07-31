import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.resolve(process.cwd(), 'users.json');
const getUsers = () => JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const users = getUsers();
        const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin' // Specify the custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
