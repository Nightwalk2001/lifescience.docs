import React from "react"

type PageContainerProps = {
  children: React.ReactNode
}

export const PageContainer: React.FC<PageContainerProps> = ({children}) =>
  <div className={"flex flex-col items-center min-w-[900px] max-w-[80%] mx-auto !mt-12 prose"}>
    {children}
  </div>
