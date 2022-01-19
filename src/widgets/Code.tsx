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
    className={"!text-gray-900 !bg-gray-50 w-full overflow-y-scroll"}
    animate={{height: [0, inView ? height : 0]}}
    layout={true}>
    {code}
  </motion.pre>
}
