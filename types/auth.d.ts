declare module '#auth-utils' {
  interface User {
    id: number
    name: string
    avatar_url: string
    html_url: string;
    bio: string | null;
  }
}

export {}