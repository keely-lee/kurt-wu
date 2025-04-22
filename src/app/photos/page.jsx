import Link from 'next/link';
import Image from 'next/image';
import { getAlbumContents, getAlbumsList, getImageSrc } from "../getBucket";
import { photosPath } from '../util';

export default async function Photos() {
  // Path: /photos
  // [TODO]: major error handling needed 
  // [TODO]: loading img

  const albums = await getAlbumsList(photosPath);
  const items = await getAlbumContents(photosPath);
  const photoMap = items.reduce((acc, {Key}) => {
    // [TODO]: combine request for album list + contents
    const name = Key.slice(7, Key.lastIndexOf("."));
    acc[name] = Key;
    // { landscape: photos/landscape.jpeg }
    return acc;
  }, {});

  return (
    <div className="main w-5/6 dark:bg-neutral-950 dark:text-slate-200 peer/dark flex-col">
      <h1 className='p-2 pt-4 text-center underline'>ALBUMS</h1>
      <ul className="grid grid-cols-3 auto-rows-min gap-8 p-6 w-full">
        { albums.map(async ({ name }) => {
          // [TODO]: fix this
          let source;
          if (photoMap[name]) {
            const src = await getImageSrc(photoMap[name]);
            const encoded = encodeURI(src);
            source = `data:image/jpeg;base64,${encoded}`
          } else {
            source = "window.svg"
          }

          return (
            <li key={name}>
              <Link href={`/photos/${name}`} className='relative text-center'>
                <Image
                  src={source}
                  alt={name}
                  width={600}
                  height={600}
                  className="object-cover opacity-80 aspect-square border-4 border-zinc-300 hover:opacity-100"
                />
                <span className='absolute top-1/2 left-1/2 font-bold text-zinc-300 -translate-1/2'>{name}</span>
              </Link>
            </li>
          )
        })}
      </ul> 
    </div>
  ); 
}
