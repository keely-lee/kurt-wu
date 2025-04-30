import { getAlbumsList } from '../getBucket';
import { photosPath } from '../util';
import Nav from './nav';

export default async function NavWrapper () {
  // async wrapper for layout
  const photoAlbums = await getAlbumsList(photosPath); 
  // [{ name: albumName, path: folderPath }, { name: "hawaii", path: "photos/hawaii/" }, ...]

  return (
    <div className="fixed bg-inherit
      h-1/8
      sm:h-1/5
      xl:h-full

      w-full
      p-1
      z-60
      xl:w-1/6
      xl:p-10
      xl:z-40

      xl:peer-[*]/wide:w-1/4
      peer-[*]/dark:bg-neutral-950
      peer-[*]/dark:text-slate-200
      xl:peer-[*]/dark:border-r-1
      peer-[*]/dark:[&_img]:invert"
    >
      <Nav photoAlbums={photoAlbums} />
    </div>
  );
}