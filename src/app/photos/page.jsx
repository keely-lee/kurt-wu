import Link from 'next/link';
import Image from 'next/image';
import { getAlbumContents, getAlbumsList, getImageSrc } from "../getBucket";
import { photosPath } from '../util';

export default async function Photos() {
  // Path: /photos/albumName
  // [TODO]: major error handling needed 

  const photos = await getAlbumContents(photosPath)
  const albums = await getAlbumsList(photosPath);

  return (
    <div className="main temporary">
      <Link href='/'>HOME</Link>
      {/* figure out appropriate times to use replace */}
      Albums: 
      {/* map album names to first image? */}
      <ul>
        { albums.map(({ name }) => (
          <li key={name}>
            <Link href={`/photos/${name}`}>{name}</Link>
          </li>
        ))} 
      </ul> 

      Images
      <div> 
        {
          photos.map(async ({Key, ETag}) => {
            const photo = await getImageSrc(Key)
            const encoded = encodeURIComponent(photo)
            return (
              <Image src={`data:image/jpeg;base64,${encoded}`}
                key={ETag} 
                alt={Key} 
                width={500}
                height={500}
              />
            )
          })
        }
      </div>
    </div>
  ); 
}
