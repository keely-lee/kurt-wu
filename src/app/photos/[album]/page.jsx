import Link from 'next/link'
import { getAlbumContents, getImageSrc } from "@/app/getBucket"

export default async function Album ({ params }) {
  // /photos/albumName
  const { album } = await params;

  const { Contents } = await getAlbumContents(`photos/${album}/`) // cannot have the initial /
  // [{ Key: 'photos/albumName/', Size: 0, ETag: '"d41d8cd98f00b204e9800998ecf8427e"' ... }, 
  //  { Key: 'photos/albumName/photo_name.jpg', Size: 1981105, ETag: '"ebacb11b167161b33e0b9f18efae4ac4"' ...}]
  // [TODO]: put this somewhere else
  const photos = Contents.filter(({ Size }) => Size);
  // console.log("-------- photos --------")
  // console.log(photos)
  // console.log("-------- photos --------")

  return (
    <div>
      <Link href='/photos'>BACK</Link>
      <h1>{album}</h1>
      <div>
        {
          photos.map(async ({Key, ETag}) => {
            const photo = await getImageSrc(Key);
            // const ext = Key.lastIndexOf('.');
            // const name = ext === -1 ? Key : Key.slice(0, ext);
            return (
              // <Link href={name.replace("photos/", "")} >
              <Link href={Key.replace("photos/", "")} >
              {/* <Link href={`/photos/${album}/${}`}> */}
                <img key={ETag} src={`data:image/png;base64,${photo}`} alt="" width={500}/>
              </Link>
            )
            // return <Image key={photoContents.ETag} src={`data:image/png;base64,${photo}`} alt="" />
          })
        }
      </div>
    </div>
  )
  
}