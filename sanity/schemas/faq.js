export const faq = {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 99,
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question" },
  },
};
