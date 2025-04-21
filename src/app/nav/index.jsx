import classNames from 'classnames';
import { getAlbumsList } from '../getBucket';
import { photosPath } from '../util';
import Nav from './nav';

export default async function NavWrapper () {
  // async wrapper for layout
  const photoAlbums = await getAlbumsList(photosPath); 
  // [{ name: albumName, path: folderPath }, { name: "hawaii", path: "photos/hawaii/" }, ...]

  return (
    // [TODO]: add tailwind variant
    <div className="h-full fixed p-10 temp-red border-r-1 w-1/4 
      peer-[*]/wide:w-1/6
      peer-[*]/wide:bg-whited
      peer-[*]/wide:text-black"
    >
      <Nav photoAlbums={photoAlbums} />
    </div>
  );
}