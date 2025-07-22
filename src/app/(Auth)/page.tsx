import Image from "next/image";
import { ModeToggle } from "@/components/buttons/ModeToggle";
import { FormLogin } from "./components/FormLogin";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[url('/backgrounds/bg-light.webp')] dark:bg-[url('/backgrounds/bg-dark.webp')] neutral:bg-[url('/backgrounds/bg-neutral.webp')]  bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="block dark:hidden">
            <Image
              src="/logos/apolologo.webp"
              alt="Logo Light"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto mx-auto"
              priority
            />
          </div>

          <div className="hidden dark:block">
            <Image
              src="/logos/apolologo2.webp"
              alt="Logo Dark"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto mx-auto"
              priority
            />
          </div>
        </div>

        <div className="rounded-2xl p-8 bg-white/90 dark:bg-[#081733]/53 neutral:bg-neutral-50 backdrop-blur-sm border border-gray-200 dark:border-[#242D41]/60 shadow-xl dark:shadow-2xl">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            Iniciar Sesión
          </h2>

          <FormLogin />
        </div>
      </div>
    </div>
  );
}
