import Link from 'next/link';
import Image from 'next/image';
import { getAlbumContents, getImageSrc } from "@/app/getBucket";
import { photosPath } from '@/app/util';

export default async function Album ({ params }) {
  // Path: /photos/albumName
  const { album } = await params;
  const photos = await getAlbumContents(`${photosPath}${album}/`);

  return (
    <div className="main album-main flex-col">
      <h1 className="text-center">{album}</h1>
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-1 justify-items-center'>
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
                  width={800}
                  height={700}
                />
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}
