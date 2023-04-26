import { store } from "@/redux";
import { Routes } from "@/routes";
import "@/styles/css/globals.css";
import "@/styles/scss/globals.scss";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
import { Provider } from "react-redux";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
});

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <SSRProvider>
        <Head>
          <title>Dewe Tour</title>
          <meta
            name="description"
            content="Dewe Tour is travel book app created by Rakasiwi Surya"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={poppins.className}>
          <Routes {...props} />
        </div>
      </SSRProvider>
    </Provider>
  );
}
