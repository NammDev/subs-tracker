// import { NextRequest } from 'next/server'

// import messages from '@/config/messages'
// import { checkAuth } from 'lib/auth'

// export async function POST(request: NextRequest) {
//   return await checkAuth(async (user: User) => {
//     const { email } = await request.json()
//     if (!email) {
//       return new Response(messages.account.delete.missingEmail, { status: 400 })
//     }
//     if (user.email !== email) {
//       throw new Error(messages.account.delete.error)
//     }
//     try {
//       const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)
//       if (error) {
//         throw new Error(error.message)
//       }
//       return new Response(JSON.stringify({ message: messages.account.delete.success }), {
//         status: 200,
//       })
//     } catch (error) {
//       return new Response(
//         JSON.stringify({ error, message: error?.toString() || messages.account.delete.error }),
//         {
//           status: 500,
//         }
//       )
//     }
//   })
// }
