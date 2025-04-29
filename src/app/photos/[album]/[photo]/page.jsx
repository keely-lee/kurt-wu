import Link from 'next/link';
import Image from 'next/image';
import { getImageSrc } from '@/app/getBucket';

export default async function Photo ({ params }) {
  const { album, photo } = await params;
  const src = await getImageSrc(`photos/${album}/${photo}`);
  const encoded = encodeURI(src)
  return (
    <div className='main album-main flex-col w-5/6'>
      <Link href={`/photos/${album}`} className='fixed p-2 hover:cursor-pointer max-xl:top-28'>
        <Image
          src="/arrow-left-solid.svg"
          alt="back"
          width={15}
          height={15}
        />
      </Link>
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
