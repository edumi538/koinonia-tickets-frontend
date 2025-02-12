"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Church,
  Users,
  Tent,
  Building,
  Mic2,
  MoreHorizontal,
  UserCircle2,
  Heart,
  Crown,
  UsersIcon,
} from "lucide-react";

type ExperienceFormProps = {
  onNextStep: (data: any) => void;
  onPrevStep: () => void;
  initialData: any;
};

type FormData = {
  yearsOfExperience: number;
  eventTypes: string[];
  targetAudience: string[];
};

const eventOptions = [
  { value: "Cultos", label: "Cultos", icon: Church },
  { value: "Conferências", label: "Conferências", icon: Users },
  { value: "Retiros", label: "Retiros", icon: Tent },
  { value: "Congressos", label: "Congressos", icon: Building },
  { value: "Shows gospel", label: "Shows gospel", icon: Mic2 },
  { value: "Outros", label: "Outros", icon: MoreHorizontal },
];

const audienceOptions = [
  { value: "Jovens", label: "Jovens", icon: UserCircle2 },
  { value: "Casais", label: "Casais", icon: Heart },
  { value: "Líderes", label: "Líderes", icon: Crown },
  { value: "Igreja em geral", label: "Igreja em geral", icon: Church },
  { value: "Outros", label: "Outros", icon: UsersIcon },
];

export function ExperienceForm({
  onNextStep,
  onPrevStep,
  initialData,
}: ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialData,
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    onNextStep(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2 flex items-center justify-around">
        <Label htmlFor="yearsOfExperience" className="w-40">
          Tempo de experiência na área (Anos)
        </Label>
        <Input
          id="yearsOfExperience"
          className="w-40"
          type="number"
          {...register("yearsOfExperience", {
            required: "Tempo de experiência é obrigatório",
            min: { value: 0, message: "O valor deve ser positivo" },
          })}
        />
        {errors.yearsOfExperience && (
          <p className="text-red-500 text-sm">
            {errors.yearsOfExperience.message}
          </p>
        )}
      </div>

      <div>
        <Label>Tipos de eventos promovidos</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {eventOptions.map((option) => (
            <Controller
              key={option.value}
              name="eventTypes"
              control={control}
              rules={{ required: "Selecione pelo menos um tipo de evento" }}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`event-${option.value}`}
                    checked={field.value?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const updatedValue = checked
                        ? [...(field.value || []), option.value]
                        : (field.value || []).filter(
                            (value: string) => value !== option.value
                          );
                      field.onChange(updatedValue);
                    }}
                  />
                  <Label
                    htmlFor={`event-${option.value}`}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <option.icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </Label>
                </div>
              )}
            />
          ))}
        </div>
        {errors.eventTypes && (
          <p className="text-red-500 text-sm">{errors.eventTypes.message}</p>
        )}
      </div>

      <div>
        <Label>Público-alvo</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {audienceOptions.map((option) => (
            <Controller
              key={option.value}
              name="targetAudience"
              control={control}
              rules={{ required: "Selecione pelo menos um público-alvo" }}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`audience-${option.value}`}
                    checked={field.value?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const updatedValue = checked
                        ? [...(field.value || []), option.value]
                        : (field.value || []).filter(
                            (value: string) => value !== option.value
                          );
                      field.onChange(updatedValue);
                    }}
                  />
                  <Label
                    htmlFor={`audience-${option.value}`}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <option.icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </Label>
                </div>
              )}
            />
          ))}
        </div>
        {errors.targetAudience && (
          <p className="text-red-500 text-sm">
            {errors.targetAudience.message}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onPrevStep} variant="outline">
          Voltar
        </Button>
        <Button type="submit">Finalizar</Button>
      </div>
    </form>
  );
}
