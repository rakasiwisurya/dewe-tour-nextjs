import { ReapopNotification } from "@/components";
import { AppProps } from "next/app";
import React from "react";

const Routes = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <ReapopNotification />
    </>
  );
};

export default Routes;
