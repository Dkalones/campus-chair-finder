import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function GoogleLoginButton() {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  if (loading) {
    return <Button disabled>Carregando...</Button>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt={user.displayName ?? "Usuário"}
            className="h-8 w-8 rounded-full"
          />
        )}
        <span className="text-sm font-medium">{user.displayName}</span>
        <Button variant="outline" size="sm" onClick={() => logout()}>
          Sair
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => loginWithGoogle()}>
      Entrar com Google
    </Button>
  );
}
