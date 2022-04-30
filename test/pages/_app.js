import "../styles/globals.css";

import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";

import { RecoilRoot } from "recoil";
import ApolloSetting from "../src/components/commons/layout/apollo";
import Layout from "../src/components/commons/layout";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloSetting>
    </RecoilRoot>
  );
}

export default MyApp;
