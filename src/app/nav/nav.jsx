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
      <nav className="h-11/12 max-xl:h-full max-xl:flex max-xl:flex-wrap">
        <div className="h-3/10 max-xl:h-5/10 max-sm:h-3/10 max-xl:order-1 max-xl:flex-[8_0]">
          <h1 className="pt-8 pb-8 pl-0 max-xl:p-2">Kurt Wu Photography</h1>
        </div>
        <div className="*:pt-2 *:pb-2 h-5/10 max-xl:order-3 max-xl:basis-full max-xl:flex max-xl:pl-2">
          <div className={classNames("max-xl:pl-2 max-xl:pr-4", {"hide-bg": togglePhotos})} tabIndex={0} onBlur={handleBlur}>
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
          <div className="max-xl:pl-6">
            <a href="/">Bio</a>
          </div>
        </div>

        <div className="links h-2/10 max-xl:order-2 max-xl:flex-[1_0] max-xl:self-center">
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
      <footer className="flex h-1/12 justify-center items-end text-sm 
        max-xl:fixed max-xl:bottom-2 max-xl:z-60 max-xl:w-full
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
