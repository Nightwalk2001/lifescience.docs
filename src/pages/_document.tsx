import clsx from "clsx"
import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en" className="[--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]">
        <Head>
          <meta name="description" content="王志威用于pre、paper、labs的网站"/>
          <link rel="icon" href={"/favicon.svg"}/>
          <link rel="manifest" href={"/manifest.json"}/>
          <link rel="apple-touch-icon" sizes={"512x512"} href={"/logo512.png"}/>
          <link rel="apple-touch-icon" sizes="192x192" href={"/logo192.png"}/>
          <meta name="theme-color" content={"#fff"}/>
          {/*<script*/}
          {/*  dangerouslySetInnerHTML={{*/}
          {/*    __html: `*/}
          {/*      try {*/}
          {/*        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {*/}
          {/*          document.documentElement.classList.add('dark')*/}
          {/*        } else {*/}
          {/*          document.documentElement.classList.remove('dark')*/}
          {/*        }*/}
          {/*      } catch (_) {}*/}
          {/*    `*/}
          {/*  }}*/}
          {/*/>*/}
        </Head>
        <body
          className={clsx("antialiased text-gray-500 dark:text-gray-400", {
            "bg-white dark:bg-gray-900": !this.props.dangerousAsPath.startsWith("/examples/")
          })}
        >
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument