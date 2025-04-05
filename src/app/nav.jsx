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
    <nav>
      {/* back button here??  */}
      <h1>Kurt Wu Photography</h1>
      <ul>
        <Link href="/photos">Photos</Link>
        <Image 
          src="/angle-right-solid.svg"
          className={classNames({"display": togglePhotos})}
          alt="Email"
          width={16}
          height={16}
          onClick={() => handleClick('photos')}
        />
        <Image 
          src="/angle-down-solid.svg"
          className={classNames({"display": !togglePhotos})}
          alt="Email"
          width={16}
          height={16}
          onClick={() => handleClick('photos')}
          style="color:white"
          // REMOVE
        />
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
      <div><a href="/" >Bio</a></div>
      <br/>
      <br/>
      <br/>

      <div>
        <a>twitter</a><br/>
        <a>fb</a><br/>
        
        <a href="https://www.instagram.com/_73nine?igsh=MWZ5d3FnMnNjMnlicw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4" >
          <Image
            className="dark:invert"
            src="/instagram-brands.svg"
            alt="Instagram logo"
            width={38}
            height={38}
          />
        </a>
        <a href="mailto:wusicong001@gmail.com" className="flex items-center gap-2 hover:underline hover:underline-offset-4" >
          <Image
            className="dark:invert"
            src="/envelope-regular.svg"
            alt="Email"
            width={38}
            height={38}
          />
        </a>
      </div>
    </nav>
  )
}
