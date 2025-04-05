import Link from 'next/link';
import Image from 'next/image';
import { getAlbumContents, getImageSrc } from "@/app/getBucket";
import { photosPath } from '@/app/util';

export default async function Album ({ params }) {
  // Path: /photos/albumName
  const { album } = await params;
  const photos = await getAlbumContents(`${photosPath}${album}/`);

  return (
    <div>
      <Link href='/photos'>BACK</Link>
      <h1>{album}</h1>
      <div>
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
                  width={500}
                  height={500}
                />
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}
