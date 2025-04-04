import { cache } from 'react';
// switch to NextJs use cache when stable
import AwsClient from './aws';

const s3Client = new AwsClient();

// [TODO]: need to review Incremental Static Regeneration 
// https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration

export const getPhotos = cache(async () => s3Client.getPhotos());
export const getVideos = cache(async () => s3Client.getVideos());

export const getPhotosAlbumList = cache(async function () {
// export const getPhotosAlbumList = cache(async function ({ album }) {
  const { CommonPrefixes } = await getPhotos();
  return CommonPrefixes.map(({ Prefix }) => {
    const name = Prefix.replace("photos/", "").slice(0,-1);
    return {
      // [ { name: albumName, path: folderPath }, { name: "hawaii", path: "photos/hawaii/" }, ... ]
      "name": name,
      "path": Prefix,
    }  
  })
});

export const getImageSrc = cache((photoId) => s3Client.getImageSrc(photoId)); // rename key
