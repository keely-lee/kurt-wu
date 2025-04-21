import Image from "next/image";

export default async function Home() {
  return (
    <div className="main max-h-screen justify-center w-3/4 dark:bg-neutral-950 peer/dark peer/wide">
    {/* <div className="sm:p-20 font-[family-name:var(--font-geist-sans)]"> */}
      <main className="flex pt-4 pb-2 h-full temp-h-11/12">
        <Image 
          src="/self.jpg"
          alt="self"
          width={800}
          height={800}
          className="object-contain"
        />
      </main>
    </div>
  );
}
