import Image from 'next/image';
import React from "react";
import Link from "next/link";

type BaseLoginProps = {
    children: React.ReactNode;
}

const BaseLogin = ({children}: BaseLoginProps) => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">

            <div className="bg-primary relative hidden lg:flex justify-center items-center">
                <div className="relative w-[500px] h-[500px]">
                    <Image
                        src="/symbol-logo.png"
                        alt="Logo Therasoft App"
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 0px, 500px"
                        priority
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-end">
                    <Link className="flex items-center gap-2 font-medium" href="/">  {/*TODO About page*/}
                        <div
                            className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                            <Image
                                src="symbol-w-48.svg"
                                alt={"Logo Therasoft App"}
                                width={150}
                                height={150}
                            />
                        </div>
                        Therasoft App
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BaseLogin;