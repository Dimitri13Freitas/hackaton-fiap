import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Control, Controller, useFormContext } from "react-hook-form";
import { MindEaseText } from "../../components/text/text";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface MindEaseInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  control?: Control<any>;
}

export const MindEaseControlledInput = ({
  control: controlProp,
  label,
  placeholder,
  name,
  type = "text",
  ...props
}: MindEaseInputProps) => {
  const formContext = useFormContext();
  const control = controlProp ?? formContext?.control;

  const [showPassword, setShowPassword] = useState(false);

  if (!control) {
    throw new Error(
      "Este componente deve ser usado dentro de um FormProvider ou receber a prop 'control'",
    );
  }

  const isPassword = type === "password";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;

        return (
          <div className="relative mb-4">
            {label && (
              <Label htmlFor={name} className="mb-2 block">
                {label}
              </Label>
            )}

            <div className="relative">
              <Input
                {...props}
                {...field}
                id={name}
                placeholder={placeholder}
                type={isPassword && showPassword ? "text" : type}
                aria-invalid={hasError}
                className={`
                  pr-10
                  ${
                    hasError
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                `}
              />

              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>

            {hasError && (
              <MindEaseText
                variant="xs"
                className="mt-1 absolute text-destructive"
              >
                {error.message}
              </MindEaseText>
            )}
          </div>
        );
      }}
    />
  );
};
