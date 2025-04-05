import Link from 'next/link';
import { getPhotosAlbumList } from "./getBucket";

export default async function nav () {
  const photoAlbums = await getPhotosAlbumList(); // [ { name: albumName, path: folderPath }, { name: "hawaii", path: "photos/hawaii/" }, ... ]

  const handleDisplay = (list) => {
    // set limit amount of albums, cap @ 8-10?
  }

  return (
    <nav>
      <h1>Kurt Wu Photography</h1>
      {/* <div onClick={() => handleDisplay('photos')}>Photos</div> */}
      <ul>
        <Link href="/photos">Photos</Link>
        {
          photoAlbums.map(({ name, _path }) => {
            return (
              <li key={name}>
                <Link href={`/photos/${name}`}>{name}</Link>
              </li>
            )
          })
        }
      </ul>
      <div>Videos</div>
      <div>Bio</div>
      <br/>
      <br/>
      <br/>

      <div>
        <a>twitter</a><br/>
        <a>fb</a><br/>
        <a>ig</a><br/>
        <a>email</a>
      </div>
    </nav>
  )
}
