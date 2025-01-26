import { boolean, date, json, link, model, string } from 'ronin/schema';

export const Comment = model({
  slug: "comment",

  fields: {
    string: string(),
    thought: link({
      target: "thought",
    }),
    user: link({
      target: "user",
    }),
    username: string(),
  },
});

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
    publicKey: string(),
    publicUserId: string(),
    username: string(),
  },
});
