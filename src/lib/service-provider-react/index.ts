import React, { useContext } from "react";
import { ServiceProvider } from "lib/service-provider";

export const ServiceContext = React.createContext(null);

export function useService<T>(service: string): T {
  const ctx = useContext(ServiceContext) as ServiceProvider;
  return ctx.get(service);
}

export function useServiceProvider(): ServiceProvider {
  const ctx = useContext(ServiceContext) as ServiceProvider;
  return ctx;
}
