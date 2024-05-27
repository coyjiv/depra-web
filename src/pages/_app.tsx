import "@/styles/globals.css";
import { store } from "@/store";
import { Provider } from "react-redux";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Login from "@/pages/login";
import Register from "@/pages/register";
import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar/Sidebar";
import BottomTabNavigator from "@/components/BottomTabNavigator/BottomTabNavigator";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <SessionProvider session={pageProps.session}>
                <AuthWrapper>
                    <div className="lg:flex lg:min-h-screen flex-none min-h-screen">
                        <Sidebar />
                        <div className="lg:hidden"><BottomTabNavigator /></div>
                        <div className="lg:flex-1 flex bg-green-100 min-h-screen">
                            <Component {...pageProps} />
                        </div>
                    </div>
                </AuthWrapper>
            </SessionProvider>
        </Provider>
    );
}

function AuthWrapper({ children }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <Login />;
    }

    return <>{children}</>;
}

export default MyApp;
