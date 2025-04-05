import Link from 'next/link';
import { getImageSrc } from '@/app/getBucket';

export default async function Photo ({ params }) {
  const { album, photo } = await params;
  const src = await getImageSrc(`photos/${album}/${photo}`);
  return (
    <div>
      <Link href={`/photos/${album}`}>HOME/BACK standardize this</Link>
      <h1>I AM PHOTO</h1>
      <img src={`data:image/png;base64,${src}`} />
    </div>
  )
}