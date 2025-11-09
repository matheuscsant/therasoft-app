"use client"

import {cn} from "@/lib/utils"
import Link from "next/link";
import {Button} from "@/components/ui/button"
import {Field, FieldDescription, FieldGroup, FieldLabel,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import React from "react";
import {useAuth} from "@/hooks/use-auth";
import {Loader2} from "lucide-react";

export function ForgotPasswordForm({
                                       className,
                                       ...props
                                   }: React.ComponentProps<"form">) {

    const {sendPasswordReset, isLoading, success, error} = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        await sendPasswordReset(email);
    };

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Esqueceu a senha?</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Digite o email associado com sua conta para redefinir sua senha.
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" disabled={isLoading} placeholder="matheus.santos@therasoft.com"
                           required/>
                </Field>
                <Field>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Enviando email...
                            </>
                        ) : (
                            "Redefinir senha"
                        )}
                    </Button>
                </Field>

                {success && (
                    <div className="text-green-500 text-sm text-center p-2 bg-green-50 rounded">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                        {error}
                    </div>
                )}

                <Field>
                    <FieldDescription className="text-center">
                        Para voltar para a página de login, <Link href="/sign-in">clique aqui!</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
