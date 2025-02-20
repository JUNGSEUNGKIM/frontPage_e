"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Provider(props: ColorModeProviderProps) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider value={defaultSystem}>
                <ColorModeProvider {...props} forcedTheme="light" />
            </ChakraProvider>
        </QueryClientProvider>
    );
}
