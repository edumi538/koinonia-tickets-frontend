"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type PersonalDataFormProps = {
  onNextStep: (data: any) => void;
};

type FormData = {
  name: string;
  documentType: "cpf" | "cnpj";
  document: string;
  birthDate: string;
  email: string;
  phone: string;
  whatsapp: string;
  city: string;
};

export function PersonalDataForm({ onNextStep }: PersonalDataFormProps) {
  const [documentType, setDocumentType] = useState<"cpf" | "cnpj">("cpf");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    onNextStep(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          {...register("name", { required: "Nome é obrigatório" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="documentType">Tipo de Documento</Label>
            <Switch
              id="documentType"
              checked={documentType === "cnpj"}
              onCheckedChange={(checked) =>
                setDocumentType(checked ? "cnpj" : "cpf")
              }
            />
            <span>{documentType.toUpperCase()}</span>
          </div>
          <Controller
            name="document"
            control={control}
            rules={{ required: `${documentType.toUpperCase()} é obrigatório` }}
            render={({ field }) => (
              <PatternFormat
                format={
                  documentType === "cpf"
                    ? "###.###.###-##"
                    : "##.###.###/####-##"
                }
                customInput={Input}
                {...field}
              />
            )}
          />
          {errors.document && (
            <p className="text-red-500 text-sm">{errors.document.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Telefone é obrigatório" }}
            render={({ field }) => (
              <PatternFormat
                format="(##) #####-####"
                customInput={Input}
                {...field}
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Data de Nascimento</Label>
          <Controller
            name="birthDate"
            control={control}
            rules={{ required: "Data de nascimento é obrigatória" }}
            render={({ field }) => (
              <PatternFormat
                format="##/##/####"
                customInput={Input}
                {...field}
              />
            )}
          />
          {errors.birthDate && (
            <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade/Região de atuação</Label>
          <Input
            id="city"
            {...register("city", { required: "Cidade/Região é obrigatória" })}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Próximo
      </Button>
    </form>
  );
}
