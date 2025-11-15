import { useEffect, useState } from "react";

export const ProgressOfOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 1, label: "Payed", duration: 4000 },
    { id: 2, label: "In Work", duration: 8000 },
    { id: 3, label: "Delivery", duration: 7000 },
    { id: 4, label: "Done", duration: 5000 },
  ];

  useEffect(() => {
    if (currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, steps[currentStep].duration || 2000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const getColor = (stepIndex) => {
    if (currentStep > stepIndex) {
      return "bg-orange-400";
    } else if (currentStep === stepIndex) {
      return "bg-orange-400";
    } else {
      return "bg-orange-200";
    }
  };

  const renderStepContent = (stepIndex) => {
    if (currentStep > stepIndex) {
      return (
        <svg
          className="w-5 h-5 text-fg-brand"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 11.917 9.724 16.5 19 7.5"
          />
        </svg>
      );
    } else {
      return (stepIndex + 1).toString();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div
        className={`w-12 h-12 rounded-full text-white items-center flex justify-center ${getColor(
          0
        )}`}
      >
        {renderStepContent(0)}
      </div>
      <div className={`h-1 w-25 rounded-3xl mx-2 ${getColor(0)}`}></div>

      <div
        className={`w-12 h-12 rounded-full text-white items-center flex justify-center ${getColor(
          1
        )}`}
      >
        {renderStepContent(1)}
      </div>
      <div className={`h-1 w-25 rounded-3xl mx-2 ${getColor(1)}`}></div>

      <div
        className={`w-12 h-12 rounded-full text-white items-center flex justify-center ${getColor(
          2
        )}`}
      >
        {renderStepContent(2)}
      </div>
      <div className={`h-1 w-25 rounded-3xl mx-2 ${getColor(2)}`}></div>

      <div
        className={`w-12 h-12 rounded-full text-white items-center flex justify-center ${getColor(
          3
        )}`}
      >
        {renderStepContent(3)}
      </div>
    </div>
  );
};
