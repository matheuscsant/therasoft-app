import "../globals.css";
import React from "react";

export default function PrivateLayout({
                                          children,
                                      }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
