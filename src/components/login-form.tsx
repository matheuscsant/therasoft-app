"use client"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Field, FieldDescription, FieldGroup, FieldLabel,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import React from "react";
import Link from "next/link";
import {Loader2} from "lucide-react";
import {useAuth} from "@/hooks/use-auth";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"form">) {
    const {login, isLoading, error} = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await login(email, password);
    };

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Utilize o seu e-mail e senha cadastrada para entrar.
                    </p>
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                        {error}
                    </div>
                )}

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="matheus.santos@therasoft.com"
                        required
                        disabled={isLoading}
                    />
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <Link className="ml-auto text-sm underline-offset-4 hover:underline" href="/forgot-password">
                            Esqueceu a senha?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="**********"
                        required
                        disabled={isLoading}
                    />
                </Field>
                <Field>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Entrando...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </Field>
                <Field>
                    <FieldDescription className="text-center">
                        Ainda não possui uma conta? <Link href="/register">Cadastre-se!</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
