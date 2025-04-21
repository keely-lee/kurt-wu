"use client"

import Link from "next/link";
import Image from "next/image";
import React, { useState } from 'react';
import classNames from "classnames";

export default function nav ({ photoAlbums = [] }) {
  // [{ name: albumName, path: folderPath }, { name: "hawaii", path: "photos/hawaii/" }, ...]

  const [ togglePhotos, setTogglePhotos ] = useState(false);
  const [ toggleVideos, setToggleVideos ] = useState(false);

  const handleClick = (list) => {
    // [TODO] set limit amount of albums, cap @ 8-10?
    if (list === 'photos') {
      setTogglePhotos(!togglePhotos);
    } else if (list === 'videos') {
      setToggleVideos(!toggleVideos);
    }
  }

  return (
    <div className="h-full">
      <nav className="h-11/12">
        <div className="h-3/10">
          <h1 className="pt-8 pb-8 pl-0">Kurt Wu Photography</h1>
        </div>
        <div className="*:pt-2 *:pb-2 h-5/10">
          <div> {/* photo div*/}
            <div className="flex">
              <Link href="/photos" className="pr-2">Photos</Link>
              <Image
                src="/angle-right-solid.svg"
                className={classNames("hover:cursor-pointer", {"hide": togglePhotos})}
                alt="toggle"
                width={10}
                height={16}
                onClick={() => handleClick('photos')}
              />
              <Image
                src="/angle-down-solid.svg"
                className={classNames("hover:cursor-pointer", {"hide": !togglePhotos})}
                alt="toggle"
                width={16}
                height={12}
                onClick={() => handleClick('photos')}
              />
            </div>
            <ul className={classNames("pl-4", {"hide": !togglePhotos})}>
              {
                photoAlbums.map(({ name, _path }) => (
                  <li key={name}>
                    <Link href={`/photos/${name}`}>{name}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div> {/* video div */}
            <div className="flex">
              <Link href="/videos" className="pr-2">Videos</Link>
              <Image
                src="/angle-right-solid.svg"
                className={classNames("hover:cursor-pointer", {"hide": toggleVideos})}
                alt="toggle"
                width={10}
                height={16}
                onClick={() => handleClick('videos')}
              />
              <Image
                src="/angle-down-solid.svg"
                className={classNames("hover:cursor-pointer", {"hide": !toggleVideos})}
                alt="toggle"
                width={16}
                height={12}
                onClick={() => handleClick('videos')}
              />
            </div>
            <ul></ul>
          </div>
          <div>
            <a href="/" >Bio</a>
          </div>
        </div>

        <div className="links h-2/10">
          <a href="https://www.instagram.com/_73nine?igsh=MWZ5d3FnMnNjMnlicw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4" >
            <Image
              src="/instagram-brands.svg"
              alt="Instagram logo"
              width={23}
              height={23}
            />
          </a>
          <a href="mailto:wusicong001@gmail.com" className="flex items-center gap-2 hover:underline hover:underline-offset-4" >
            <Image
              src="/envelope-regular.svg"
              alt="Email"
              width={23}
              height={23}
            />
          </a>
        </div>
      </nav>
      <footer className="flex h-1/12 justify-center items-end text-sm">
        <div>
          <a href="https://keely-lee.github.io/" target="_blank" className="copyright">
            &copy; Keely Lee
          </a>
        </div>
      </footer>
    </div>
  )
}
