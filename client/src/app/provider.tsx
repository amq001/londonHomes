"use client";

import storeProvider from "@/state/redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <storeProvider>{children}</storeProvider>;
}

export default Providers;