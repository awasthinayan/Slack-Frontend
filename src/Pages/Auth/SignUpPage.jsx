import { SignUpContainer } from '@/components/Organisms/Auth/SignUpContainer';

export const SignUpPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="auth-orb auth-orb-left" />
      <div className="auth-orb auth-orb-right" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <SignUpContainer />
        </div>
      </div>
    </main>
  );
};
