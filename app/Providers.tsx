"use client";
import {  ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import {  ConvexProviderWithClerk } from "convex/react-clerk";
import { dark } from "@clerk/themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#2563eb",
              colorBackground: "#020617",
              colorInputBackground: "#0f172a",
              colorInputText: "#eff6ff",
              colorTextOnPrimaryBackground: "#eff6ff",
              fontSize: '16px'
            },
          }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        
        {children}
        
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
