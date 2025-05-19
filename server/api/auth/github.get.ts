export default defineOAuthGitHubEventHandler({
  async onSuccess(event, {user}) {

    await useDrizzle().insert(tables.users).values({
      id: user.id,
      name: user.name,
      avatar: user.avatar_url,
      bio: user.bio,
      url: user.blog || user.html_url
    }).onConflictDoNothing({ target: tables.users.id });

    await setUserSession(event, {user})
    return sendRedirect(event, '/feed')
  }
})
