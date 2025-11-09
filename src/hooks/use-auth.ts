import {useState} from "react";
import {useRouter} from "next/navigation";
import {authService} from "@/services/auth.service";
import {ApiError} from "@/types/api-error";
import {sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase";
import {FirebaseError} from "@firebase/app";
import {setCookie} from "@/utils/cookies";

function firebaseErrorMessage(err: FirebaseError): string {
    switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
            return "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.";
        case "auth/user-not-found":
            return "Não encontramos uma conta com este e-mail. Verifique o endereço digitado ou crie uma nova conta.";
        case "auth/network-request-failed":
            return "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.";
        case "auth/too-many-requests":
            return "Muitas tentativas de login. Aguarde alguns instantes antes de tentar novamente.";
        case "auth/user-disabled":
            return "Esta conta foi desativada. Entre em contato com o suporte para mais informações.";
        case "auth/invalid-email":
            return "O endereço de e-mail informado é inválido. Verifique e tente novamente.";
        default:
            return "Ocorreu um erro ao fazer login. Tente novamente em instantes.";
    }
}


function handleError(err: unknown, def: string = "Ocorreu um erro ao fazer login. Tente novamente em instantes.") {
    if (err instanceof ApiError) return err.message;
    if (err instanceof FirebaseError) return firebaseErrorMessage(err);
    if (err instanceof Error) return err.message;
    return def;
}

export function useAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError("");

        try {
            let token;

            if (process.env.NODE_ENV === "production") {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                token = await userCredential.user.getIdToken();
            } else {
                token = "";
            }

            const response = await authService.login(token);
            setCookie("thera-token", response.token);
            router.push("/profile");
        } catch (err) {
            const msg = handleError(err);
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const sendPasswordReset = async (email: string) => {
        setIsLoading(true);
        setSuccess("")
        setError("");

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess("Tudo certo! Enviamos um e-mail com o link para redefinir sua senha. Verifique também a pasta de spam.");
        } catch (err) {
            const msg = handleError(err, "Ocorreu um erro ao enviar o e-mail de redefinição de senha. Tente novamente em instantes.");
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await authService.logout();
        router.push("/sign-in");
    };

    return {
        login,
        logout,
        sendPasswordReset,
        isLoading,
        success,
        error
    };
}
