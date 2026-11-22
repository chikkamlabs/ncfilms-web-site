export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityReference {
  _type: 'reference';
  _ref: string;
  _weak?: boolean;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityCrop {
  _type?: 'sanity.imageCrop';
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityHotspot {
  _type?: 'sanity.imageHotspot';
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityImageAsset {
  _id: string;
  _type: 'sanity.imageAsset';
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  url: string;
  path?: string;
  assetId?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  originalFilename?: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip?: string;
    blurHash?: string;
  };
}

export interface SanityImage {
  _type: 'image';
  _key?: string;
  asset: SanityReference | SanityImageAsset;
  alt?: string;
  crop?: SanityCrop;
  hotspot?: SanityHotspot;
}

export interface Service extends SanityDocument {
  _type: 'service';
  title: string;
  description?: string;
  count?: number;
  tags?: string[];
  images?: SanityImage[];
  order?: number;
  isActive?: boolean;
}

export interface HomeScreen extends SanityDocument {
  _type: 'homescreen';
  images: SanityImage[];
  isActive?: boolean;
}

export interface Project extends SanityDocument {
  _type: 'project';
  title: string;
  slug: SanitySlug;
  description?: string;
  service: SanityReference | Service;
  coverImage: SanityImage;
  images?: SanityImage[];
  projectDate?: string;
  city?: string;
  order?: number;
  isActive?: boolean;
}

export interface TeamMember extends SanityDocument {
  _type: 'teamMember';
  name: string;
  tag?: string;
  description?: string;
  image: SanityImage;
  order?: number;
  isActive?: boolean;
}

export interface Testimonial extends SanityDocument {
  _type: 'testimonial';
  clientName: string;
  service?: SanityReference | Service;
  tag?: string;
  review: string;
  image?: SanityImage;
  order?: number;
  isActive?: boolean;
}
