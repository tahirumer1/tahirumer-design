export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      description: "Under hero text (e.g. 'Helping businesses turn...')",
    },
    {
      name: "aboutIntro",
      title: "About Strip Text",
      type: "text",
      rows: 4,
      description: "Short intro shown on home page",
    },
    {
      name: "yearsExperience",
      title: "Years of Experience",
      type: "number",
      initialValue: 10,
    },
    {
      name: "projectsCount",
      title: "Successful Projects",
      type: "number",
      initialValue: 100,
    },
    {
      name: "countriesCount",
      title: "Countries Served",
      type: "number",
      initialValue: 6,
    },
    {
      name: "email",
      title: "Contact Email",
      type: "string",
      initialValue: "hello@tahirumer.design",
    },
    {
      name: "available",
      title: "Available for Projects",
      type: "boolean",
      initialValue: true,
      description: "Shows 'Available' badge in nav",
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
};
