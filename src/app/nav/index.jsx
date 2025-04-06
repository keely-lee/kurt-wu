import { getAlbumsList } from '../getBucket';
import { photosPath } from '../util';
import Nav from './nav';

export default async function NavWrapper () {
  // async wrapper for layout
  const photoAlbums = await getAlbumsList(photosPath); 
  // [{ name: albumName, path: folderPath }, { name: "hawaii", path: "photos/hawaii/" }, ...]

  return (
    <div className="w-1/4  h-full fixed p-10 temp-red border-r-1">
      <Nav photoAlbums={photoAlbums} />
    </div>
  );
}