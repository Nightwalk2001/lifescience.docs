import { useState, useEffect } from 'react'

export const useMedia = (query:string, defaultState = false) => {
    const [state, setState] = useState(defaultState)

    useEffect(() => {
        let mounted = true
        const mql = window.matchMedia(query)
        const onChange = () => {
            if (!mounted) {
                return
            }
            setState(mql.matches)
        }

        mql.addListener(onChange)
        setState(mql.matches)

        return () => {
            mounted = false
            mql.removeListener(onChange)
        }
    }, [query])

    return state
}
