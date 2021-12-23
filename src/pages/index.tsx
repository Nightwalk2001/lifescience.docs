import {Anim, Navigation} from "@/features"
import clsx from "clsx"
import Head from "next/head"
import styles from "./home.module.css"

// const Header = () => <header className="relative">
//   <div className="px-4 sm:px-6 md:px-8">
//     <div
//       className={clsx(
//         'absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-gray-50 dark:bg-[#0B1120]',
//         styles.beams
//       )}
//     >
//     <div
//       className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-gray-400/[0.05] dark:bg-bottom dark:border-b dark:border-gray-100/5"
//       style={{
//         maskImage: 'linear-gradient(to bottom, transparent, black)',
//         WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
//       }}
//     />
//     </div>
//     <div className="relative pt-6 lg:pt-8 flex items-center justify-between text-gray-700 font-semibold text-sm leading-6 dark:text-gray-200">
//       <Logo className="w-auto h-5" />
//       <div className="flex items-center">
//         <SearchButton className="text-gray-500 hover:text-gray-600 w-8 h-8 -my-1 flex items-center justify-center md:hidden dark:hover:text-gray-300">
//           <span className="sr-only">Search</span>
//           <svg
//             width="24"
//             height="24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             aria-hidden="true"
//           >
//             <path d="m19 19-3.5-3.5" />
//             <circle cx="11" cy="11" r="6" />
//           </svg>
//         </SearchButton>
//         <NavPopover className="-my-1 ml-2 -mr-1" display="md:hidden" />
//         <div className="hidden md:flex items-center">
//           <nav>
//             <ul className="flex items-center space-x-8">
//               <NavItems />
//             </ul>
//           </nav>
//           <div className="flex items-center border-l border-gray-200 ml-6 pl-6 dark:border-gray-800">
{/*            <ThemeToggle />*/
}
{/*            <a*/
}
{/*              href="https://github.com/tailwindlabs/tailwindcss"*/
}
{/*              className="ml-6 block text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"*/
}
{/*            >*/
}
{/*              <span className="sr-only">Tailwind CSS on GitHub</span>*/
}
{/*              <svg*/
}
//                 viewBox="0 0 16 16"
//                 className="w-5 h-5"
{/*                fill="currentColor"*/
}
{/*                aria-hidden="true"*/
}
{/*              >*/
}
//                 <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
{/*    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">*/
}
{/*      <h1 className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">*/
}
{/*        Rapidly build modern websites without ever leaving your HTML.*/
}
//       </h1>
//       <p className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto dark:text-gray-400">
//         A utility-first CSS framework packed with classes like{' '}
//         <code className="font-mono font-medium text-sky-500 dark:text-sky-400">flex</code>,{' '}
//         <code className="font-mono font-medium text-sky-500 dark:text-sky-400">pt-4</code>,{' '}
//         <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
//           text-center
//         </code>{' '}
//         and{' '}
//         <code className="font-mono font-medium text-sky-500 dark:text-sky-400">rotate-90</code>{' '}
//         that can be composed to build any design, directly in your markup.
//       </p>
//       <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
//         <NextLink href="/docs/installation">
//           <a className="bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
//             Get started
//           </a>
//         </NextLink>
//         <SearchButton className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-gray-900/10 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-gray-400 dark:bg-gray-800 dark:ring-0 dark:text-gray-300 dark:highlight-white/5 dark:hover:bg-gray-700">
//           {({ actionKey }) => (
//             <>
//               <svg
//                 width="24"
//                 height="24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="flex-none text-gray-300 dark:text-gray-400"
{/*                aria-hidden="true"*/
}
{/*              >*/
}
{/*                <path d="m19 19-3.5-3.5" />*/
}
{/*                <circle cx="11" cy="11" r="6" />*/
}
{/*              </svg>*/
}
{/*              <span className="flex-auto">Quick search...</span>*/
}
{/*              {actionKey && (*/
}
{/*                <kbd className="font-sans font-semibold dark:text-gray-500">*/
}
{/*                  <abbr*/
}
{/*                    title={actionKey[1]}*/
}
{/*                    className="no-underline text-gray-300 dark:text-gray-500"*/
}
//                   >
//                     {actionKey[0]}
//                   </abbr>{' '}
//                   K
//                 </kbd>
//               )}
//             </>
//           )}
//         </SearchButton>
//       </div>
//     </div>
{/*  </div>*/
}
{/*  /!*<Hero />*!/*/
}
{/*</header>*/
}

const Home = () => {
  return <>
    <Head>
      <title>index page</title>
    </Head>

    <div className={"mb-20 space-y-20 overflow-hidden sm:mb-32 sm:space-y-32 md:mb-40 md:space-y-40"}>
      <header className={"relative"}>
        <div className="px-4 sm:px-6 md:px-8">
          <div
            className={clsx(
              "absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-gray-50 dark:bg-[#0B1120]",
              styles.beams
            )}
          >
            <div
              className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-gray-400/[0.05] dark:bg-bottom dark:border-b dark:border-gray-100/5"
              style={{
                maskImage: "linear-gradient(to bottom, transparent, black)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, black)"
              }}
            />
          </div>
        </div>

        <Navigation/>

        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <h1
            className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            Class paper、lab reports and presentation by <span
            className={"bg-gradient-to-r from-sky-500 to-purple-700 gradient"}>Wang Zhiwei</span>.
          </h1>
          <p className="mt-6 text-lg text-gray-600 text-center max-w-2xl mx-auto dark:text-gray-400">
            Using the digital version, you can get dynamic visualizations, freewheeling interactions, and beautiful
            interfaces to let you know what I am good at.
            {/*.{" "}*/}
            {/*<code className="font-mono font-medium text-sky-500 dark:text-sky-400">regulation</code>,{" "}*/}
            {/*<code className="font-mono font-medium text-sky-500 dark:text-sky-400">between</code>,{" "}*/}
            {/*<code className="font-mono font-medium text-sky-500 dark:text-sky-400">*/}
            {/*  epigenome*/}
            {/*</code>{" "}*/}
            {/*and{" "}*/}
            {/*<code className="font-mono font-medium text-sky-500 dark:text-sky-400">epitranscriptome</code>{" "}*/}
            {/*that can be composed.*/}
          </p>

          <div className={"flex flex-col items-center mt-10"}>
            <div className={"flex"}>
              <button
                className={"mr-12 px-3.5 py-2.5 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-400"}>
                quick start
              </button>
              <button
                className={"px-3.5 py-2.5 text-gray-500 bg-white rounded-md shadow-md hover:bg-gray-50"}>
                documentation
              </button>
            </div>
          </div>

        </div>

        <Anim/>
      </header>

    </div>
  </>
}

export default Home
