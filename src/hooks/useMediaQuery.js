import { useState, useEffect } from "react"

export const useMediaQuery = (queryValue, initialValue = false) => {
    const [match, setMatch] = useState(initialValue)
  
    useEffect(() => {
      let isMounted = true
      const matchMedia = window.matchMedia(queryValue)
  
      const handleChange = () => {
        if (!isMounted) return
        setMatch(Boolean(matchMedia.matches))
      }

      console.log(matchMedia)
  
      matchMedia.addEventListener('change', handleChange)
      setMatch(!!matchMedia.matches)
  
      return () => {
        isMounted = false
        matchMedia.removeEventListener('change', handleChange)
      }
  
    }, [queryValue])
  
    return match
  
  }