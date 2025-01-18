import { useEffect, useState } from "react";

export default function useMatchMedia(
  callback: (matched: boolean) => void,
  query: string,
  deps?: React.DependencyList
) {
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    const mediaQuery = matchMedia(query);
    const handleChange = () => {
      setMatched(mediaQuery.matches);
      callback(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    setMatched(mediaQuery.matches);
    callback(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, deps);

  return matched;
}
