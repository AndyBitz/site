import { boolean, date, json, link, model, string } from 'ronin/schema';

export const Thought = model({
  slug: "thought",

  fields: {
    title: string(),
    slug: string(),
    text: json({
      displayAs: 'rich-text'
    }),
    postedAt: date(),
    externalLink: string(),
    hidden: boolean(),
  },

  identifiers: {
    name: 'title',
    slug: 'slug'
  }
});

export const User = model({
  slug: "user",

  fields: {
    publicKey: json(),
    publicUserId: string(),
    username: string(),
  },

  identifiers: {
    name: 'username',
  }
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
  },
});
