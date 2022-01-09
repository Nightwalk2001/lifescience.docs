import Image from "next/image"
import React from "react"

type LayoutProps = {
  left: React.ReactNode
  right: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({left, right}) =>
  <div
    className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-20 sm:mt-24 lg:mt-48 lg:grid lg:gap-8 lg:grid-cols-12 lg:items-center">
    <div className="relative row-start-1 col-start-6 xl:col-start-7 col-span-7 xl:col-span-6 -mt-32">
      <div className="-mx-4 sm:mx-0">{right}</div>
    </div>
    <div className="relative row-start-1 col-start-1 col-span-5 xl:col-span-6 -mt-32">
      <div className="h-[24.25rem] max-w-xl mx-auto lg:max-w-none flex items-center justify-center">
        <div className="w-full flex-none">{left}</div>
      </div>
    </div>
  </div>

export const Anim: React.FC = () => <Layout
  left={<div>
    <Image src={"/biocontrol/wordcloud.svg"} width={768} height={540}/>
  </div>}
  right={
    <div className={"px-3.5 py-3 text-xl bg-white rounded-lg shadow-xl"}>
      マスターチューリングの完全な言語には、JavaScript /
      TypeScript、Kotlin、Swift、Java、Python、Golang、Rust、Dart、Scala、Clojure、F＃、C＃が含まれます。オペレーティングシステム、コンピューター構成の原則、アルゴリズムとデータ構造、およびコンピューターネットワークの原則を研究しました。ウェブサイト、Android、iOS、Windows、macOS、React、Next、Remix、Gatsby、Vue、Hexo、Flutter、Reactに精通したソフトウェア開発が得意
      Native、Electron、KMP、JetpackCompose。サーバーサイドの開発に長けており、ほぼすべてのサーバーサイドフレームワーク、Django、Express、Springなどの従来のフレームワークをマスターできます。
      Bootはそのソースコードに精通しており、Rust、Golang、Kotlin、およびNodejsのサーバー側開発を好みます。
      Mongodb、Redis、FLink、Kafka、Fluentd、Oauth2などのさまざまなミドルウェアに精通している。 Linux、K8s、Istio、Elasticなどのさまざまな運用および保守テクノロジーに精通している
      スタック、Docker、GithubなどのCI / CDツール
      ワークフローなど。データの視覚化に長けており、D3.jsの使用に習熟しており、手動でパスを記述できます。深層学習、注意モデル、深層強化学習、トランスフォーマー、およびその背後にある数学的原理、マトリックス理論、トポロジー、圏論などのさまざまなテクノロジーが得意です。少しのコンピュータグラフィックスを理解し、Canvasを上手に使用する
      API、OpenGL API、Three.js。
    </div>
  }/>
