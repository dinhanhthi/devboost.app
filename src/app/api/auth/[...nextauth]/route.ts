import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import { v5 as uuidv5 } from 'uuid'
import firestoreDb from '../../../../lib/firebaseAdmin'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ],
  // adapter: FirestoreAdapter({
  //   credential: cert({
  //     projectId: process.env.FIREBASE_PROJECT_ID,
  //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //     privateKey: process.env.FIREBASE_PRIVATE_KEY
  //   })
  // }),
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        const userRef = firestoreDb.collection('users').doc(generateUuidBasedOnEmail(session.user.email))
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

function generateUuidBasedOnEmail(email: string) {
  return uuidv5(email, uuidv5.URL)
}
