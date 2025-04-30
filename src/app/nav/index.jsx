import { getAlbumsList } from '../getBucket';
import { photosPath } from '../util';
import Nav from './nav';

export default async function NavWrapper () {
  // async wrapper for layout
  const photoAlbums = await getAlbumsList(photosPath); 
  // [{ name: albumName, path: folderPath }, { name: "hawaii", path: "photos/hawaii/" }, ...]

  return (
    <div className="h-full fixed p-10 w-1/6 bg-inherit
      peer-[*]/wide:w-1/4
      peer-[*]/dark:bg-neutral-950
      peer-[*]/dark:text-slate-200
      peer-[*]/dark:border-r-1
      peer-[*]/dark:[&_img]:invert

      max-sm:h-1/8
      max-xl:h-1/5
      max-xl:p-1
      max-xl:w-full
      max-xl:border-none
      max-xl:z-60"
    >
      <Nav photoAlbums={photoAlbums} />
    </div>
  );
}