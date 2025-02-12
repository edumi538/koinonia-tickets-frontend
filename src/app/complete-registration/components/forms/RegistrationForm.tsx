"use client"

import { useState } from "react"
import { PersonalDataForm } from "./PersonalDataForm"
import { ExperienceForm } from "./ExperienceForm"
import { StepIndicator } from "../StepIndicator"

export default function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})

  const handleNextStep = (data: any) => {
    setFormData((prevData) => ({ ...prevData, ...data }))
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const totalSteps = 2 // Update this if you add more steps

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <StepIndicator currentStep={step} totalSteps={totalSteps} />
        <h1 className="font-bold text-center pb-8"> {step === 1? "Informações Pessoais": "Informações Profissionais"}</h1>
        {step === 1 && <PersonalDataForm onNextStep={handleNextStep} />}
        {step === 2 && (
          <ExperienceForm onNextStep={handleNextStep} onPrevStep={handlePrevStep} initialData={formData} />
        )}
        {/* Add more steps here as needed */}
      </div>
    </div>
  )
}

