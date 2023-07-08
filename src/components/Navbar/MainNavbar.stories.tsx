import type { Meta, StoryObj } from "@storybook/react";
import MainNavbar from "./MainNavbar";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "src/contexts/auth.context";
import { CartProvider } from "src/contexts/cart.context";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";
const queryClient = new QueryClient();
const meta: Meta<typeof MainNavbar> = {
  component: MainNavbar,
  title: "MainNavbar",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <AuthProvider>
              <CartProvider>
                <Story />
              </CartProvider>
            </AuthProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </BrowserRouter>
    ),
  ],
};
