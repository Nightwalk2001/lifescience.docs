import {Menu, Transition} from "@headlessui/react"
import {MenuIcon} from "@heroicons/react/outline"
import Link from "next/link"
import {useRouter} from "next/router"
import React from "react"

export const BiocontrolMenu = () => {
  const router = useRouter()

  return <div className={"fixed right-4 top-36"}>
    <Menu as={"div"} className="relative inline-block text-left">
      <Menu.Button
        className="inline-flex justify-center w-full text-sm font-medium text-purple-300 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"><MenuIcon
        className={"w-6 h-6"}/></Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          className="absolute right-0 w-28 mt-2 px-3 pt-1 pb-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <LinkItem to={"1"} title={"背景与前景"}/>
          <LinkItem to={"2"} title={"CNN原理"}/>
          <LinkItem to={"3"} title={"应用前景"}/>
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
}

type LinkItemProps = {
  to: string
  title: string
}

const LinkItem: React.FC<LinkItemProps> = ({to, title}) => {
  return <Menu.Item as={"div"} className={"mt-1 transition hover:text-indigo-300"}>
    <Link href={`/presentation/biocontrol/${to}`}>{title}</Link>
  </Menu.Item>
}