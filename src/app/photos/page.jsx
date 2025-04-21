import Link from 'next/link';
import Image from 'next/image';
import { getAlbumContents, getAlbumsList, getImageSrc } from "../getBucket";
import { photosPath } from '../util';

export default async function Photos() {
  // Path: /photos
  // [TODO]: major error handling needed 
  // [TODO]: loading img

  const albums = await getAlbumsList(photosPath);

  return (
    <div className="main w-3/4 dark:bg-neutral-950 dark:text-slate-200 peer/dark peer/wide">
      Albums: 
      {/* map album names to first image? */}
      <ul>
        { albums.map(({ name }) => (
          <li key={name}>
            <Link href={`/photos/${name}`}>{name}</Link>
          </li>
        ))} 
      </ul> 
    </div>
  ); 
}
