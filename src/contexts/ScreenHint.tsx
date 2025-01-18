"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ScreenHintContextProps {
  setHint: React.Dispatch<React.SetStateAction<string>>;
}

const ScreenHintContext = createContext<ScreenHintContextProps>({
  setHint: () => {}
});

export const ScreenHintContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hint, setHint] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setHint(""), 2000);
    return () => clearTimeout(timer);
  }, [hint]);

  return (
    <ScreenHintContext.Provider value={{ setHint }}>
      <ScreenHint hint={hint} setHint={setHint} />
      {children}
    </ScreenHintContext.Provider>
  );
};

export const useScreenHintContext = () => useContext(ScreenHintContext);

function ScreenHint({ hint, setHint }: { hint: string; setHint: React.Dispatch<React.SetStateAction<string>> }) {
  if (!hint) return null;

  return (
    <section
      onClick={() => setHint("")}
      className="fixed z-10 inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center"
    >
      <p className="text-4xl bg-gray-100/20 font-bold py-3 px-5 rounded-lg">{hint}</p>
    </section>
  );
}
