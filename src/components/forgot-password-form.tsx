import {cn} from "@/lib/utils"
import Link from "next/link";
import {Button} from "@/components/ui/button"
import {Field, FieldDescription, FieldGroup, FieldLabel,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import React from "react";

export function ForgotPasswordForm({
                                       className,
                                       ...props
                                   }: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Esqueceu a senha?</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Digite o email associado com sua conta para redefinir sua senha.
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="matheus.santos@therasoft.com" required/>
                </Field>
                <Field>
                    <Button type="submit">Redefinir senha</Button>
                </Field>
                <Field>
                    <FieldDescription className="text-center">
                        Para voltar para a página de login, <Link href="/sign-in">clique aqui!</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
