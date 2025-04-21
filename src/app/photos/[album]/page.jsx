import Link from 'next/link';
import Image from 'next/image';
import { getAlbumContents, getImageSrc } from "@/app/getBucket";
import { photosPath } from '@/app/util';

export default async function Album ({ params }) {
  // Path: /photos/albumName
  const { album } = await params;
  const photos = await getAlbumContents(`${photosPath}${album}/`);

  return (
    <div className="main album-main flex-col bg-white w-5/6 peer/wide">
      <Link className="tempb" href='/photos'>BACK</Link>
      <h1 className="tempb text-center">{album}</h1>
      {/* <div className='flex justify-evenly tempgap-y-10 flex-wrap'> */}
      <div className='grid grid-cols-3'>
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
