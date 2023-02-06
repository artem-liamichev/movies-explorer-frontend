import { useEffect, useState } from 'react';

const useMedia = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => {
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setMatches(media.matches)
      }, 1000)
    }
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
};

export default useMedia;