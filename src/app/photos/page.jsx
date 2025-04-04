import { getPhotos, getPhotosAlbumList, getImageSrc } from "../getBucket";

export default async function Photos() {
  //  Delimiter: "/" -> response.CommonPrefixes for list of album name (undefined if none, includes only album names, no floating objects). trailing / included for album names
  //  Delimiter: "/", Prefix: "photos/" -> response.Contents for items (including current folder)
  // [TODO]: major error handling needed 
  // const photosCommand = new ListObjectsCommand({ Bucket: BUCKET, Prefix: PHOTOS });
  // const photosCommand = new ListObjectsCommand({ Bucket: BUCKET, Delimiter: "/", Prefix: PHOTOS });
  // const { Contents } = await s3Client.send(photosCommand); 

  // const photo = await s3Client.send(new GetObjectCommand({ Bucket: BUCKET, Key: 'photos/temp-photo.jpg' }))
  // const photoContent = await photo.Body.transformToString('base64')
  const { Contents } = await getPhotos(); 
  // [{ Key: 'photos/', Size: 0, ETag: '"d41d8cd98f00b204e9800998ecf8427e"' ... }, 
  //  { Key: 'photos/photo_name.jpg', Size: 1981105, ETag: '"ebacb11b167161b33e0b9f18efae4ac4"' ...}]

  // [TODO]: put this somewhere else
  const photos = Contents.filter(({ Size }) => Size);
  const albums = await getPhotosAlbumList(); // [ { name: albumName, path: folderPath }, ... ]

  return (
    <div> 
      Albums: 
      {/* <div> { albumNames.map(name => <div key={name}>{name}</div>) } </div> <br/> */}

      {/* <img src="https://kurtwuphotography.s3.us-east-1.amazonaws.com/photos/temp-photo.jpg" />  */}

      Images
      <div> 
        {
          photos.map(async (photoContents) => {
              const photo = await getImageSrc(photoContents.Key)
              return <img key={photoContents.ETag} src={`data:image/png;base64,${photo}`} />
          })
        }
      </div>
    </div>
  ); 
}
