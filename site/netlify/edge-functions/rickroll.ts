import type { Context } from "https://edge.netlify.com";

const BOT_UA_PATTERN = /(WhatsApp|Telegram|Signal|Slack|Discord|Preview|bot|spider|crawl|Headless|facebookexternalhit|Twitterbot|LinkedInBot)/i;

const REDIRECT_TARGETS: Record<string, string> = {
  "/song": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "/spreadsheet": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "/blogpost": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
};

export default async (request: Request, _context: Context): Promise<Response> => {
  const path = new URL(request.url).pathname;
  const userAgent = request.headers.get("user-agent") ?? "";

  if (BOT_UA_PATTERN.test(userAgent)) {
    return new Response(null, { status: 204 });
  }

  const target = REDIRECT_TARGETS[path];

  if (!target) {
    return new Response("Not found", { status: 404 });
  }

  return Response.redirect(target, 302);
};
