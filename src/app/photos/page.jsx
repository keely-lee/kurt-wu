import Link from 'next/link';
import Image from 'next/image';
import { getPhotos, getPhotosAlbumList, getImageSrc } from "../getBucket";

export default async function Photos() {
  //  Delimiter: "/" -> response.CommonPrefixes for list of album name (undefined if none. trailing '/' included for album names)
  // [TODO]: major error handling needed 

  const { Contents } = await getPhotos(); 
  // [{ Key: 'photos/', Size: 0, ETag: '"d41d8cd98f00b204e9800998ecf8427e"' ... }, 
  //  { Key: 'photos/photo_name.jpg', Size: 1981105, ETag: '"ebacb11b167161b33e0b9f18efae4ac4"' ...}]

  // [TODO]: put this somewhere else
  const photos = Contents.filter(({ Size }) => Size);
  const albums = await getPhotosAlbumList(); // [ { name: albumName, path: folderPath }, ... ]

  return (
    <div> 
      <Link href='/'>HOME</Link>
      {/* figure out appropriate times to use replace */}
      Albums: 
      <ul>
        { albums.map(({name, _path}) => (
          <li key={name}>
            <Link href={`/photos/${name}`}>{name}</Link>
          </li>
        ))} 
      </ul> 

      Images
      <div> 
        {
          photos.map(async (photoContents) => {
              const photo = await getImageSrc(photoContents.Key)
              return <img key={photoContents.ETag} src={`data:image/png;base64,${photo}`} alt="" width={500}/>
              // return <Image key={photoContents.ETag} src={`data:image/png;base64,${photo}`} alt="" />
          })
        }
      </div>
    </div>
  ); 
}
