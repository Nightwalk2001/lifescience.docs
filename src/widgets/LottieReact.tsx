import Lottie from "lottie-web"
import React, {memo, useEffect, useRef} from "react"

type LottieReactProps = {
  animation: any
  className?: string
}

export const LottieReact: React.FC<LottieReactProps> = memo(({animation, className, ...rest}) => {
  const animationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (animationRef.current) Lottie.loadAnimation({
      animationData: animation,
      container: animationRef.current,
      autoplay: true,
      loop: true
    })
  }, [animation])

  return <div ref={animationRef} className={className} {...rest}/>
})
