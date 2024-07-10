import "../styles/globals.css";
import Head from "next/head";
import toast,{Toaster} from "react-hot-toast"

// INTERNAL IMPORT3

import {StateContextProvider} from "../Context/index"

export default function App({ Component, pageProps }) {
  return (
    <>
      <StateContextProvider>
      <Component {...pageProps} />
      <Toaster />
      </StateContextProvider>
    </>
  );
}
