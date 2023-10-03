import { JSDOM } from "jsdom";

const getContent = async (name: string) => {
  const url = "https://git-generator.vercel.app/github/languages/" + name;

  return fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const dom = new JSDOM(html);
      return dom.window.document.querySelector("main")?.innerHTML ?? "";
    })
    .catch(() => {
      return "";
    });
};

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  res.setHeader("Content-Type", "svg+xml");
  const content = await getContent(req.query.username as string);
  res.status(200).send(content);
}
