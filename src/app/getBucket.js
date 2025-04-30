import { cache } from 'react';
// switch to NextJs [use cache] when stable
import AwsClient from './aws';
import { photosPath } from './util';

const s3Client = new AwsClient();
/*
  [TODO]: need to review Incremental Static Regeneration
  https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
*/

// [TODO]: error handling (throughout app)

const _getAlbumContents = cache(async (path) => {
  // Note: path should not have the initial '/'
  const albumContents = await s3Client.getAlbumContents(path);
  return albumContents;
})

export const getAlbumContents = cache(async (album = photosPath) => {
  // Note: path should not have the initial '/'
  const path = album.slice(-1) === "/" ? album : album + "/"; 
  try {
    const { Contents } = await _getAlbumContents(path);  
    /*
      Current folder included in Contents
      [{ Key: 'photos/', Size: 0, ETag: '"d41d8cd98f00b204e9800998ecf8427e"' ... }, 
      { Key: 'photos/photo_name.jpg', Size: 1981105, ETag: '"ebacb11b167161b33e0b9f18efae4ac4"' ...}]
    */
    const photos = Contents.filter(({ Size }) => Size);
    return photos;
  } catch (e) {
    console.log('--- get contents error ----')
    console.log(e)
    console.log('--- get contents error ----')
  }
});

export const getAlbumsList = cache(async function (path = photosPath) {
  try {
    const { CommonPrefixes } = await _getAlbumContents(path) // || []
    // WARNING: CommonPrefixes will be undefined if no albums/folders exist
    return CommonPrefixes.map(({ Prefix }) => {
      const album = Prefix.slice(path.length, -1);
      return {
        // [ { name: albumName, path: folderPath }, { name: "hawaii", path: "photos/hawaii/" }, ... ]
        "name": album,
        "path": Prefix,
      }  
    }) 
  } catch (e) {
    console.log('--- get albums error ----')
    console.log(e)
    console.log('--- get albums error ----')
  }
});

const _getBucketObject = async (key) => {
  const obj = await s3Client.getBucketObject(key);
  return obj;
}

export const getImageSrc = cache(async (photoKey) => {
  // key: 'photos/photoName.jpg' or 'photos/albumName/photoName.jpg'
  try {
    const imageObj = await _getBucketObject(photoKey);
    const srcStr = await imageObj.Body.transformToString('base64');
    return srcStr;
  } catch (e) {
    console.log('--- get albums error ----')
    console.log(e)
    console.log('--- get albums error ----')
  }
}); 
