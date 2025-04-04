import Nav from "./nav";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Nav />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div >
          <ul className="copyright">
            <li>&copy; Keely Lee</li>
            <li>Design: </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

