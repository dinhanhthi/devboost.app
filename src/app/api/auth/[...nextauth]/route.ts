import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import firestoreDb from '../../../../lib/firebaseAdmin'
import { generateUuidBasedOnEmail } from '../../../../lib/utils'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        const userRef = firestoreDb
          .collection('users')
          .doc(generateUuidBasedOnEmail(session.user.email))
        const userDoc = await userRef.get()

        if (!userDoc.exists) {
          const user = {
            id: generateUuidBasedOnEmail(session.user.email),
            name: session.user.name,
            email: session.user.email,
            githubAvatarUrl: session.user.image
          }

          await userRef.set(user)
        } else {
          console.log('Welcome back, ' + session.user.name + '!')
        }
      }

      return session
    }
  }
})

export { handler as GET, handler as POST }
