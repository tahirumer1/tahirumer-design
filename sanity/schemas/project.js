export const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "UI/UX", value: "UI/UX" },
          { title: "Graphic", value: "Graphic" },
          { title: "Development", value: "Development" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "featured",
      title: "Featured on Home",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 99,
    },
    {
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex color (e.g. #4D7CFF) for project tags",
      initialValue: "#D4FF00",
    },
    {
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "heroImage",
      title: "Hero Image (case study)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "brief",
      title: "Brief",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(240),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "timeline",
      title: "Timeline",
      type: "string",
    },
    {
      name: "platform",
      title: "Platform",
      type: "string",
    },
    {
      name: "challenge",
      title: "The Challenge",
      type: "text",
      rows: 6,
    },
    {
      name: "context",
      title: "Context",
      type: "text",
      rows: 6,
    },
    {
      name: "process",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Step Title" },
            { name: "description", type: "text", rows: 4, title: "Description" },
          ],
        },
      ],
    },
    {
      name: "outcome",
      title: "Outcome",
      type: "text",
      rows: 4,
    },
    {
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
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
    select: {
      title: "title",
      category: "category",
      year: "year",
      media: "thumbnail",
    },
    prepare({ title, category, year, media }) {
      return {
        title,
        subtitle: `${category} · ${year}`,
        media,
      };
    },
  },
};
