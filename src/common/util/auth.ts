const ALLOWED_HOSTS = [
  'localhost:3000',
  'chatzchen.vercel.app',
  'chat-anschmiegs-projects.vercel.app',
  'chat.canthat.be',
];

export function validateCallbackUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return ALLOWED_HOSTS.includes(parsedUrl.host);
  } catch {
    return false;
  }
}