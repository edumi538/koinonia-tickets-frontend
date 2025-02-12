type StepIndicatorProps = {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            i + 1 === currentStep
              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-primary-foreground"
              : i + 1 < currentStep
                ? "bg-primary/50 text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  )
}

