"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

export function Provider(props: ColorModeProviderProps) {
    const queryClient = new QueryClient();

    // Disable context menu (viar right clicking or two finger tapping) 
    useEffect(() => {
        const handleContextMenu = (e: any) => {
          e.preventDefault()
        }
        document.addEventListener("contextmenu", handleContextMenu)
        return () => {
          document.removeEventListener("contextmenu", handleContextMenu)
        }
      }, [])

    return (
        <div 
            style={{touchAction: 'none'}} // prevent horizontal swipe navigation
        >
            <QueryClientProvider client={queryClient}>
                <ChakraProvider value={defaultSystem}>
                    <ColorModeProvider {...props} forcedTheme="light" />
                </ChakraProvider>
            </QueryClientProvider>
        </div>
    );
}
