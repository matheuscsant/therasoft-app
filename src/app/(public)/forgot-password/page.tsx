import {ForgotPasswordForm} from "@/components/forgot-password-form";
import BaseLogin from "@/components/base-login";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Esqueci a Senha - Therasoft | Recuperar Acesso",
    description: "Recupere o acesso à sua conta Therasoft. Digite seu email para receber um link de redefinição de senha e volte a gerenciar suas consultas e pacientes.",
    keywords: ["esqueci senha", "recuperar senha", "therasoft", "redefinir senha", "psicólogo", "acesso conta"],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Esqueci a Senha - Therasoft",
        description: "Recupere o acesso à sua conta na plataforma Therasoft",
        type: "website",
        locale: "pt_BR",
    },
    alternates: {
        canonical: "/forgot-password",
    },
};

export default function ForgotPassword() {
    return (
        <BaseLogin>
            <ForgotPasswordForm/>
        </BaseLogin>
    );
}
