import Image from "next/image";

export default async function Home() {
  return (
    <div className="main max-h-screen justify-center temp-green">
    {/* <div className="grid grid-rows-[20px_1fr_20px] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"> */}
      <main className="flex pt-4 pb-2 h-full temp-h-11/12 temp-red">
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"> */}
        <Image 
          src="/self.jpg"
          alt="self"
          width={800}
          height={500}
          className="object-contain temp-orange"
        />
      </main>

      {/* <footer className="flex h-1/12 pb-4 justify-center items-end">
        <div >
          <span className="copyright">&copy; Keely Lee</span>
        </div>
      </footer> */}
    </div>
  );
}
