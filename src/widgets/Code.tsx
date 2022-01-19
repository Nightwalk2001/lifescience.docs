import {motion} from "framer-motion"
import React from "react"
import {useInView} from "react-intersection-observer"

type CodeProps = {
  code: string
  height?: number
}

export const Code: React.FC<CodeProps> = ({code, height = 420}) => {
  const {ref, inView} = useInView({triggerOnce: true})
  return <motion.pre
    ref={ref}
    className={"!text-gray-900 !bg-gray-50 w-full !py-2.5 overflow-y-scroll"}
    animate={{height: [height * 2 / 3, inView ? height : height * 2 / 3]}}
    layout={true}>
    {code}
  </motion.pre>
}
