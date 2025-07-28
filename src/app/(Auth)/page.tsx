import { FormLogin } from "./components/FormLogin";

export default function LoginPage() {
  return (
    <>
      <p className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
        Iniciar Sesión
      </p>
      <FormLogin />
    </>
  );
}
