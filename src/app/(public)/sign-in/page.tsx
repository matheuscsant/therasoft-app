import {LoginForm} from "@/components/login-form";
import BaseLogin from "@/components/base-login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Therasoft | Plataforma para Psicólogos",
  description: "Acesse sua conta na Therasoft, a plataforma completa para psicólogos gerenciarem consultas, pacientes e prontuários de forma segura e eficiente.",
  keywords: ["login", "therasoft", "psicólogo", "plataforma", "consultas", "prontuários"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Login - Therasoft",
    description: "Acesse sua conta na plataforma Therasoft",
    type: "website",
    locale: "pt_BR",
  },
  alternates: {
    canonical: "/sign-in",
  },
};

export default function SignIn() {
    return (
        <BaseLogin>
            <LoginForm/>
        </BaseLogin>
    );
}
