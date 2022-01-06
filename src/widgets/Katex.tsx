import katex, {KatexOptions} from "katex"
import React, {memo, useEffect, useRef} from "react"

type KatexProps = {
  tex: string
  options?: KatexOptions
}

export const Katex: React.FC<KatexProps> = memo(({tex, options}) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) katex.render(tex, ref.current, options)
  }, [tex, options])

  return <text ref={ref}/>
})