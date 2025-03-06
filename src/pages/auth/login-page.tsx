import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useErrorHandler } from "@/api/error";
import FormField from "@/components/shared/form-field";
import ActionButton from "@/components/shared/action-button";
import Logo from "@/components/shared/nodepop-react";
import type { Credentials } from "./types";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUi } from "@/store/selectors";
import { authLogin } from "@/store/actions";

function LoginForm({
  onSubmit,
}: {
  onSubmit: (form: Credentials & { remember: boolean }) => Promise<void>;
}) {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const { pending } = useAppSelector(getUi); //nos conectamos a redux para saber si estamos haciendo la llamada al pending
  const { resetError } = useErrorHandler(); //hook para manejar errores

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials((credentials) => ({
      ...credentials,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const remember = !!formData.get("remember");

    //await dispatch(authLogin(credentials))
    //navigate(location.state?.from ?? "/", { replace: true });

    resetError(); //Reseteamos el error antes de un nuevo intento
    await onSubmit({ ...credentials, remember });
  };

  const { email, password } = credentials;
  const canSubmit = email && password;

  return (
    <div>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <FormField>
          Email
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            autoComplete="off"
          />
        </FormField>
        <FormField>
          Password
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
          />
        </FormField>
        <FormField className="flex py-2">
          <Switch name="remember" value="remember" />
          Remember me next time
        </FormField>
        <ActionButton
          disabled={!canSubmit || pending } 
          loading={pending}
          className="w-full"
        >
          {pending
            ? "Please wait"
            : canSubmit
              ? "Log in to Nodepop"
              : "Enter your credentials"}
        </ActionButton>
      </form>
      <Toaster position="bottom-center" richColors />
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();//Guarda el estado de redux en dispatch
  const { error } = useAppSelector(getUi); //Obtener el error del estado de redux
  //const { onLogin } = useAuth();

  //Mostrar el error si existe
  useEffect(() => {
    if (error) {
      toast.error(error.message); //si hay un error mostramos el mensaje de error
    }
  }, [error]);

  return (
    <div className="mx-auto h-dvh max-w-md">
      <div className="grid gap-8 px-6 py-6 pt-12">
        <header className="grid justify-items-center gap-4">
          <Logo className="h-24 w-24" />
          <h1 className="text-center text-3xl font-bold sm:text-4xl">
            Log in to Nodepop
          </h1>
        </header>
        <LoginForm
          onSubmit={async ({ remember, ...credentials }) => {
            //dispatch(AuthLoginPending()) //Inicia la accion de Login
            await dispatch(authLogin(credentials, remember)); //usamos el authLogin
            //await login(credentials, remember);
            //dispatch(AuthLoginFulfilled())
            //onLogin();
            navigate(location.state?.from ?? "/", { replace: true });
          }}
        />
      </div>
    </div>
  );
}
