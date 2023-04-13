export interface GiphyData {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: GiphyImages;
  alt_text: string;
}

export interface GiphyImages {
  original: GiphyImage;
  downsized: GiphyImage;
  downsized_large: GiphyImage;
  downsized_medium: GiphyImage;
  downsized_small: GiphyImage;
  downsized_still: GiphyImage;
  fixed_height: GiphyImage;
  fixed_height_downsampled: GiphyImage;
  fixed_height_small: GiphyImage;
  fixed_width: GiphyImage;
  fixed_width_downsampled: GiphyImage;
  fixed_width_still: GiphyImage;
  fixed_width_small: GiphyImage;
  looping: GiphyImage;
  original_still: GiphyImage;
  preview: GiphyImage;
  preview_gif: GiphyImage;
  preview_webp: GiphyImage;
}

export interface GiphyImage {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size?: string;
  webp?: string;
  frames?: string;
  hash?: string;
}

export interface GiphyMeta {
  status: number;
  msg: string;
  response_id: string;
}

export interface GiphyPagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface GIFsResponse {
  data: GiphyData[];
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

export interface UploadGIFResponse {
  msg?: string;
  status?: number;
  data: {
    id: string;
  };
}

export interface GIFDetailsResponse {
  data: GiphyData;
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}
