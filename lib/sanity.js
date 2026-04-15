import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Validate projectId — Sanity requires lowercase letters, numbers, and dashes only.
// If the env var is missing, empty, or still the placeholder, we don't create a client
// and queries.js falls back to placeholder data.
const isValidProjectId =
  projectId &&
  projectId !== "your_project_id_here" &&
  /^[a-z0-9-]+$/.test(projectId);

export const sanityClient = isValidProjectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;

export const urlFor = (source) =>
  sanityClient ? imageUrlBuilder(sanityClient).image(source) : null;