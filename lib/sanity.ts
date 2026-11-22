import { createClient } from 'next-sanity';
import { createImageUrlBuilder, type ImageUrlBuilder } from '@sanity/image-url';
import type { SanityImage } from './schemas';

function getRequiredEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing required Sanity environment variable: ${name}. Please verify your .env.local configuration.`
    );
  }
  return value;
}

const projectId = getRequiredEnv(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID'
);

const dataset = getRequiredEnv(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_DATASET'
);

const apiVersion =
  typeof window === 'undefined'
    ? getRequiredEnv(process.env.SANITY_API_VERSION, 'SANITY_API_VERSION')
    : process.env.SANITY_API_VERSION;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage): ImageUrlBuilder {
  return builder.image(source);
}
