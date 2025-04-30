"use client"

import Link from "next/link";
import Image from "next/image";
import React, { useState } from 'react';
import classNames from "classnames";

export default function nav ({ photoAlbums = [] }) {
  // [{ name: albumName, path: folderPath }, { name: "hawaii", path: "photos/hawaii/" }, ...]

  const [ togglePhotos, setTogglePhotos ] = useState(false);

  const handleClick = (_list) => {
    // [TODO] set limit amount of albums, cap @ 8-10?
    // No videos yet
    setTogglePhotos(!togglePhotos);
  }

  const handleBlur = (_e) => {
    setTogglePhotos(false);
  }

  return (
    <div className="h-full">
      <nav className="h-full xl:h-11/12 flex flex-wrap xl:block">
        <div className="h-3/10 sm:h-5/10 xl:h-3/10 order-1 flex-[8_0]">
          <h1 className="p-2 xl:py-8 xl:px-0">Kurt Wu Photography</h1>
        </div>
        <div className="*:py-2 h-5/10 flex order-3 basis-full pl-2 xl:block xl:pl-0">
          <div className={classNames("pl-2 pr-4 xl:pl-0", {"hide-bg": togglePhotos})} tabIndex={0} onBlur={handleBlur}>
            {/* photo div*/}
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
                    <Link href={`/photos/${name}`} onMouseDown={e => e.preventDefault()} onClick={handleBlur}>{name}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="pl-6 xl:pl-0">
            <a href="/">Bio</a>
          </div>
        </div>

        <div className="links h-2/10 order-2 flex-[1_0] self-center">
          <a href="https://www.instagram.com/_73nine?igsh=MWZ5d3FnMnNjMnlicw==" target="_blank" rel="noopener noreferrer">
            <Image
              src="/instagram-brands.svg"
              alt="Instagram logo"
              width={23}
              height={23}
            />
          </a>
          <a href="mailto:wusicong001@gmail.com">
            <Image
              src="/envelope-regular.svg"
              alt="Email"
              width={23}
              height={23}
            />
          </a>
        </div>
      </nav>
      <footer className="flex h-1/12 justify-center items-end text-sm z-60 w-full bottom-2 fixed xl:static opacity-60 xl:opacity-95
      ">
        <div>
          <a href="https://keely-lee.github.io/" target="_blank" className="copyright">
            &copy; Keely Lee
          </a>
        </div>
      </footer>
    </div>
  )
}
