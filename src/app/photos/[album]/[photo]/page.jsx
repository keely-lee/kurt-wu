import Link from 'next/link';
import Image from 'next/image';
import { getImageSrc } from '@/app/getBucket';

export default async function Photo ({ params }) {
  const { album, photo } = await params;
  const src = await getImageSrc(`photos/${album}/${photo}`);
  const encoded = encodeURI(src)
  return (
    <div className='main'>
      <Link href={`/photos/${album}`}>HOME/BACK standardize this</Link>
      <h1>I AM PHOTO</h1>
      <Image
        src={`data:image/jpeg;base64,${encoded}`}
        alt={photo}
        width={500}
        height={500}
        // blurDataURL=''
        // placeholder='blur'
      />
    </div>
  )
}
