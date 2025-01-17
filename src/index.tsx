import React from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: "1",
    }}
  >
    <div />
  </DynamicContextProvider>
);
