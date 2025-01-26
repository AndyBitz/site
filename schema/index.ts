import { boolean, date, json, link, model, string } from 'ronin/schema';

export const Thought = model({
  slug: "thought",

  fields: {
    title: string(),
    externalLink: string(),
    hidden: boolean(),
    postedAt: date(),
    slug: string(),
    text: json(),
  },
});

export const User = model({
  slug: "user",

  fields: {
    publicKey: json(),
    publicUserId: string(),
    username: string(),
  },
});

export const Comment = model({
  slug: "comment",

  fields: {
    text: string(),
    thought: link({
      target: "thought",
    }),
    user: link({
      target: "user",
    }),
    username: string(),
  },
});
