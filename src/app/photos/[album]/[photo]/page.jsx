import Link from 'next/link';
import Image from 'next/image';
import { getImageSrc } from '@/app/getBucket';

export default async function Photo ({ params }) {
  const { album, photo } = await params;
  const src = await getImageSrc(`photos/${album}/${photo}`);
  const encoded = encodeURI(src)
  return (
    <div className='main album-main flex-col bg-white w-5/6 peer/wide'>
      <Link href={`/photos/${album}`}>HOME/BACK</Link>
      <Image
        src={`data:image/jpeg;base64,${encoded}`}
        alt={photo}
        width={2000}
        height={1950}
        // blurDataURL=''
        // placeholder='blur'
      />
    </div>
  )
}
