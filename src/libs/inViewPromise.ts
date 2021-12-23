export const inViewPromise = (element:Element, options: any = {}) => {
    let observer: IntersectionObserver

    const promise = new Promise((resolve) => {
        const threshold = typeof options.threshold === "undefined" ? 1 : options.threshold

        observer = new IntersectionObserver((entries) => {
            for (const item of entries) {
                const inView = item.isIntersecting && item.intersectionRatio >= threshold
                if (inView) return resolve(null)
            }
        }, options)
        observer.observe(element)
    })

    return {
        promise,
        disconnect: () => {
            if (observer) observer.disconnect()
        }
    }
}
