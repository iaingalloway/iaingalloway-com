import type { Context } from "https://edge.netlify.com";

const BOT_UA_PATTERN = /(WhatsApp|Telegram|Signal|Slack|Discord|Preview|bot|spider|crawl|Headless|facebookexternalhit|Twitterbot|LinkedInBot)/i;
const REDIRECT_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export default async (request: Request, _context: Context): Promise<Response> => {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (BOT_UA_PATTERN.test(userAgent)) {
    return fetch(new URL("/", request.url));
  }

  return Response.redirect(REDIRECT_URL, 302);
};
