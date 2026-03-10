import {
  Clock,
  cn,
  Eye,
  Input,
  Maximize,
  MindEaseText,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sun,
  Switch,
  Type,
  Zap,
} from "@repo/ui";
import { useAuthStore, usePreferencesStore } from "@repo/stores";

const SettingCard = ({
  icon,
  title,
  description,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  children: React.ReactNode;
}) => (
  <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4">
    <div
      className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center text-foreground ",
        color,
      )}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    {children}
  </div>
);

const Settings = () => {
  const focusMode = usePreferencesStore((s) => s.settings?.focusMode);
  const animations = usePreferencesStore((s) => s.settings?.animations);
  const fontSize = usePreferencesStore((s) => s.settings?.fontSize);
  const spacing = usePreferencesStore((s) => s.settings?.spacing);
  const pomodoro = usePreferencesStore((s) => s.settings?.pomodoro);
  const highContrast = usePreferencesStore((s) => s.settings?.highContrast);
  const update = usePreferencesStore((s) => s.update);
  const { user } = useAuthStore();
  return (
    <div className="flex flex-1 gap-6 flex-col lg:flex-row h-full p-4">
      <div>
        <MindEaseText variant="h3">Painel Cognitivo</MindEaseText>
        <MindEaseText className="text-muted-foreground">
          Ajuste a interface às suas necessidades
        </MindEaseText>
        <div className="mx-auto max-w-4xl mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SettingCard
              icon={<Zap className="w-5 h-5 text-background" />}
              title="Modo Foco"
              description="Oculta distrações e simplifica a interface"
              color="bg-blue-200"
            >
              <Switch
                checked={focusMode}
                onCheckedChange={(v) => {
                  if (user?.uid) update({ focusMode: v }, user?.uid);
                }}
              />
            </SettingCard>

            <SettingCard
              icon={<Sun className="w-5 h-5 text-background" />}
              title="Alto Contraste"
              description="Melhora a legibilidade com mais contraste"
              color="bg-red-200"
            >
              <Switch
                checked={highContrast}
                onCheckedChange={(v) => {
                  if (user?.uid) update({ highContrast: v }, user?.uid);
                }}
              />
            </SettingCard>

            <SettingCard
              icon={<Eye className="w-5 h-5 text-background" />}
              title="Animações"
              description="Habilita transições e movimentos suaves"
              color="bg-green-200"
            >
              <Switch
                checked={animations}
                onCheckedChange={(v) => {
                  if (user?.uid) update({ animations: v }, user?.uid);
                }}
              />
            </SettingCard>

            <SettingCard
              icon={<Clock className="w-5 h-5 text-background" />}
              title="Pomodoro"
              description="Tempos de foco e pausa (min)"
              color="bg-yellow-200"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    Foco
                  </span>
                  <Input
                    onChange={({ target }) => {
                      if (user?.uid)
                        update(
                          {
                            pomodoro: { focusMinutes: +target.value },
                          },
                          user?.uid,
                        );
                    }}
                    type="number"
                    className="w-14 text-center text-sm px-0"
                    value={pomodoro?.focusMinutes}
                    min={1}
                    max={60}
                  />
                </div>

                <div className="h-8 w-[1px] bg-border mt-3" />
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    Pausa
                  </span>
                  <Input
                    onChange={({ target }) => {
                      if (user?.uid)
                        update(
                          {
                            pomodoro: { breakMinutes: +target.value },
                          },
                          user?.uid,
                        );
                    }}
                    type="number"
                    className="w-14 text-center text-sm px-0"
                    value={pomodoro?.breakMinutes}
                    min={1}
                    max={60}
                  />
                </div>
              </div>
            </SettingCard>

            {/* Espaçamento Geral */}
            <SettingCard
              icon={<Maximize className="w-5 h-5 text-background" />}
              title="Espaçamento"
              description="Densidade da interface"
              color="bg-purple-200"
            >
              <Select
                defaultValue={spacing}
                onValueChange={(v: any) => {
                  if (user?.uid) update({ spacing: v }, user?.uid);
                }}
              >
                <SelectTrigger className="w-[110px] h-9 bg-muted border-none">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </SettingCard>

            {/* Tamanho da Fonte */}
            <SettingCard
              icon={<Type className="w-5 h-5 text-background" />}
              title="Tamanho da Fonte"
              description="Escala do texto"
              color="bg-lime-200"
            >
              <Select
                defaultValue={fontSize}
                onValueChange={(v: any) => {
                  if (user?.uid) update({ fontSize: v }, user?.uid);
                }}
              >
                <SelectTrigger className="w-[110px] h-9 bg-muted border-none">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </SettingCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
