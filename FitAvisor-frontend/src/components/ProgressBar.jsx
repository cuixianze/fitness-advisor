import { useLocation } from "react-router-dom";

const steps = [
  { id: "progressBarId1", name: "Step 1", path: "/diet/dietStep1" },
  { id: "progressBarId2", name: "Step 2", path: "/diet/dietStep2" },
  { id: "progressBarId3", name: "Step 3", path: "/diet/dietStep3" },
  { id: "progressBarId4", name: "Step 4", path: "/diet/dietStep4" },
  { id: "progressBarId5", name: "Step 5", path: "/diet/dietStep5" },
  { id: "progressBarId6", name: "Step 6", path: "/diet/dietStep6" },
  { id: "progressBarId7", name: "Step 7", path: "/diet/dietStep7" },
];

export default function ProgressBar() {
  const location = useLocation();
  const currentStepIndex = steps.findIndex(
    (step) => step.path === location.pathname
  );

  const totalWidth = 100;
  const stepCount = steps.length;
  const lineLeft = `calc(${totalWidth}% / (${stepCount} * 2))`;
  const lineWidth = `calc(${totalWidth}% - (${totalWidth}% / ${stepCount}))`;
  const progressLineWidth = currentStepIndex > 0
    ? `calc((${currentStepIndex} / ${stepCount - 1}) * (${totalWidth}% - (${totalWidth}% / ${stepCount})))`
    : '0%';

  return (
    <div className="w-4/5 max-w-xl mx-auto my-10">
      <div className="relative flex items-center">
        {/* Background line */}
        <div
          className="absolute h-2 rounded-full bg-gray-200"
          style={{
            top: "50%",
            left: lineLeft,
            width: lineWidth,
            transform: "translateY(-50%)",
          }}
        />
        {/* Progress line */}
        <div
          className="absolute h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 ease-in-out"
          style={{
            top: "50%",
            left: lineLeft,
            width: progressLineWidth,
            transform: "translateY(-50%)",
          }}
        />
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex flex-col items-center flex-1 z-10">
            {/* Step circle */}
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-md transition-all duration-300 ease-in-out
                ${
                  index < currentStepIndex
                    ? "bg-green-500 text-white"
                    : index === currentStepIndex
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-300 text-gray-500"
                }`}
            >
              {index < currentStepIndex ? <CheckIcon className="w-7 h-7" /> : index + 1}
            </div>

            {/* Step name */}
            <div
              className={`text-sm font-medium mt-2 ${
                index < currentStepIndex
                  ? "text-green-600"
                  : index === currentStepIndex
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {step.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CheckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none" 
      viewBox="0 0 24 24"
      // 선 굵기를 3으로 설정해 두껍고 선명하게 만듭니다.
      strokeWidth={4} 
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}
