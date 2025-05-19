export default defineOAuthGitHubEventHandler({
  async onSuccess(event, {user}) {

    await useDrizzle().insert(tables.users).values({
      id: user.id,
      name: user.name ?? user.login,
      bio: user.bio ?? 'Nothing to say',
    }).onConflictDoNothing({ target: tables.users.id });

    await setUserSession(event, {user})
    return sendRedirect(event, '/feed')
  }
})
