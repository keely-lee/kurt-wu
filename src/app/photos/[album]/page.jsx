import Link from 'next/link';
import Image from 'next/image';
import { getAlbumContents, getImageSrc } from "@/app/getBucket";
import { photosPath } from '@/app/util';

export default async function Album ({ params }) {
  // Path: /photos/albumName
  const { album } = await params;
  const photos = await getAlbumContents(`${photosPath}${album}/`);

  return (
    <div className="main flex-col temporary tempwhite">
      <Link className="tempb" href='/photos'>BACK</Link>
      <h1 className="tempb">{album}</h1>
      <div className='flex justify-evenly tempgap-y-10 flex-wrap'>
        {
          photos.map(async ({Key, ETag}) => {
            const src = await getImageSrc(Key);
            const encoded = encodeURI(src);
            return (
              <Link href={`/${Key}`} >
                <Image
                  key={ETag}
                  src={`data:image/jpeg;base64,${encoded}`}
                  alt={Key}
                  width={550}
                  height={550}
                />
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}
