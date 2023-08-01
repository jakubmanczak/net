import Link from "next/link";

export default function PageProjects() {
  const smallProjectClass = `
    flex flex-row p-2 items-center transition-all
    border rounded gap-4 w-full max-w-[440px] md:w-[370px] text-left
    
    bg-stone-100 hover:bg-stone-200
    dark:bg-stone-800 dark:hover:bg-stone-700
    border-stone-300 hover:border-stone-400
    dark:border-stone-600 dark:hover:border-stone-500
  `;
  const wideProjectClass = `
    flex flex-col p-2 items-center transition-all
    border rounded w-full text-left mt-4 max-w-[440px] md:max-w-full

    bg-stone-100 hover:bg-stone-200
    dark:bg-stone-800 dark:hover:bg-stone-700
    border-stone-300 hover:border-stone-400
    dark:border-stone-600 dark:hover:border-stone-500
  `;
  type smallProjectType = {
    head: string;
    desc: string;
    href: string;
  };
  const smallProjects: smallProjectType[] = [
    {
      head: "Katakanize",
      desc: "A web app that transliterates your latin text to katakana.",
      href: "https://github.com/jakubmanczak/katakanize",
    },
    {
      head: "PESEL",
      desc: "A web app serving as a PESEL number verification and decoding.",
      href: "https://github.com/jakubmanczak/pesel",
    },
  ];
  return (
    <>
      <div className="max-w-3xl mx-auto px-2 py-4">
        <h1 className="font-bold text-2xl">{"/projects"}</h1>
        <p className="text-stone-500 dark:text-stone-400">
          {"Things I've made."}
        </p>
        <div className="flex flex-row justify-center">
          <Link href="https://debates.manczak.net">
            <div className={wideProjectClass}>
              <h2 className="font-bold text-lg">Debate Tools</h2>
              <p className="text-center">
                Utilities to aid in conducting oxford format debates, whether
                shown as debate background or used on mobile.
              </p>
            </div>
          </Link>
        </div>
        <div className="flex flex-row flex-wrap flex-grow-0 gap-2 py-4 justify-center md:justify-between">
          {smallProjects.map((el: smallProjectType) => {
            return (
              <Link href={el.href}>
                <section className={smallProjectClass}>
                  <h2 className="font-bold text-lg">{el.head}</h2>
                  <p>{el.desc}</p>
                </section>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
