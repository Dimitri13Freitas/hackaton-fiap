import { MindEaseControlledInput } from "./input";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";

const meta: Meta<typeof MindEaseControlledInput> = {
  title: "Forms/MindEaseControlledInput",
  component: MindEaseControlledInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    type: {
      control: "select",
      options: ["text", "password", "email"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof MindEaseControlledInput>;

const FormWrapper = (args: any) => {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-[300px] space-y-4">
        <MindEaseControlledInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    name: "email",
    label: "Email",
    placeholder: "Digite seu email",
    type: "email",
  },
};

export const Password: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    name: "password",
    label: "Senha",
    placeholder: "Digite sua senha",
    type: "password",
  },
};

export const WithoutLabel: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    name: "email",
    placeholder: "Campo sem label",
  },
};
