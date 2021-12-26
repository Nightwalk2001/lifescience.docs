import "@/styles/index.css"
import {BiocontrolMenu, Copyright, Navigation} from "@/widgets"
import type {AppProps} from "next/app"
import {useRouter} from "next/router"

const App = ({Component, pageProps}: AppProps) => {
  const router = useRouter()
  return <>
    <div className={"flex flex-col min-w-[100%] min-h-[100vh]"}>
      {router.pathname !== "/" && <Navigation/>}
      <div className={"flex-1"}>
        <Component {...pageProps} />
        {router.pathname.startsWith("/presentation/biocontrol") && <BiocontrolMenu/>}
      </div>
      <Copyright/>
    </div>
  </>
}

export default App
