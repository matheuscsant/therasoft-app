import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Field, FieldDescription, FieldGroup, FieldLabel,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import React from "react";
import Link from "next/link";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Utilize o seu e-mail e senha cadastrada para entrar.
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="matheus.santos@therasoft.com" required/>
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <Link className="ml-auto text-sm underline-offset-4 hover:underline" href="/forgot-password">Esqueceu
                            a senha?</Link>
                    </div>
                    <Input id="password" type="password" placeholder="**********" required/>
                </Field>
                <Field>
                    <Button type="submit">Login</Button>
                </Field>
                <Field>
                    <FieldDescription className="text-center">
                        Ainda não possui uma conta? <Link href="#">Cadastre-se!</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
