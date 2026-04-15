export const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "company",
      title: "Company / Role",
      type: "string",
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
    select: { title: "author", subtitle: "company" },
  },
};
