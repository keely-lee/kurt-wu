import Image from "next/image";

export default async function Home() {
  return (
    <div className="main dark:bg-neutral-950 peer/dark peer/wide justify-center xl:max-h-dvh">
    {/* <div className="sm:p-20 font-[family-name:var(--font-geist-sans)]"> */}
      <div className="flex pt-4 pb-2 h-full items-start xl:items-center">
        <Image 
          src="/self.jpg"
          alt="self"
          width={800}
          height={800}
          className="object-contain"
        />
      </div>
    </div>
  );
}
