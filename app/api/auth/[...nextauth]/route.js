import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import connectDB from '@/db/connectDb'
import User from '@/models/User'
import Payment from '@/models/Payment'

const Handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      const email = user.email;

      if (!email) {
        console.error("Email not found from provider");
        return false;
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        const newUser = await User.create({
          email,
          username: email.split('@')[0],
        });

      }

      return true;
    },

    async session({ session }) {
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });


      session.user.name = dbUser.username;
    

      return session;
    },
  },
});

export { Handler as GET, Handler as POST };
