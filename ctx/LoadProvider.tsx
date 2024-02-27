"use client";

import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { AccountContextProvider } from "./AccountContext";
import LoadEntities from "./LoadEntities";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 600000,
      retry: true,
      retryDelay: 3000,
      refetchOnWindowFocus: "always",
    },
  },
});

const LoadProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
        <AccountContextProvider>
          <Provider store={store}>
            <LoadEntities>{children}</LoadEntities>
          </Provider>
        </AccountContextProvider>
      </QueryClientProvider>
    </div>
  );
};

export default LoadProvider;
