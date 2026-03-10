import * as React from "react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@repo/stores";
import { Button, Input, MindEaseText, Separator } from "@repo/ui";

export const Profile = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("O nome não pode ficar vazio.");
      return;
    }

    try {
      await updateProfile(name);
      setSuccessMessage("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error: any) {
      setErrorMessage(error.message || "Erro ao atualizar o perfil.");
    }
  };

  return (
    <div className="flex flex-1 gap-6 flex-col lg:flex-row h-full  p-4">
      <div className="w-full">
        <div>
          <MindEaseText variant="h3">Perfil e Configurações</MindEaseText>
          <MindEaseText className="text-muted-foreground">
            Gerencie as suas informações pessoais
          </MindEaseText>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="font-semibold">
              <MindEaseText variant="lg">Informações Pessoais</MindEaseText>
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </Button>
            )}
          </div>

          {successMessage && (
            <div className="bg-green-500/10 text-green-600 p-3 rounded-md text-sm">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500/10 text-red-600 p-3 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Nome de Exibição
              </label>
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="flex gap-2">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    disabled={isLoading}
                    autoFocus
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || name === user?.displayName}
                  >
                    {isLoading ? "Salvando..." : "Salvar"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={isLoading}
                    onClick={() => {
                      setIsEditing(false);
                      setName(user?.displayName || "");
                      setErrorMessage("");
                    }}
                  >
                    Cancelar
                  </Button>
                </form>
              ) : (
                <div className="p-3 border rounded-md bg-muted/50">
                  <MindEaseText>
                    {user?.displayName || "Nenhum nome definido"}
                  </MindEaseText>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Endereço de Email
              </label>
              <div className="p-3 border rounded-md bg-muted/50 text-muted-foreground">
                <MindEaseText>
                  {user?.email || "Nenhum email disponível"}
                </MindEaseText>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                <MindEaseText variant="sm">
                  O email não pode ser alterado
                </MindEaseText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
