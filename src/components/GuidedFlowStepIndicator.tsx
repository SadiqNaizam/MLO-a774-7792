import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react'; // Example icons
import { cn } from "@/lib/utils"; // For conditional class names

interface Step {
  id: string | number;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface GuidedFlowStepIndicatorProps {
  steps: Step[];
  onStepClick?: (stepId: string | number) => void; // Optional: if steps are clickable
  className?: string;
}

const GuidedFlowStepIndicator: React.FC<GuidedFlowStepIndicatorProps> = ({ steps, onStepClick, className }) => {
  console.log("Rendering GuidedFlowStepIndicator with steps:", steps.length);

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Progress" className={cn("flex items-center justify-center space-x-2 sm:space-x-4 p-4 overflow-x-auto", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <button
            type="button"
            onClick={onStepClick && step.status !== 'current' ? () => onStepClick(step.id) : undefined}
            disabled={!onStepClick || step.status === 'current'}
            className={cn(
              "flex flex-col items-center text-center group focus:outline-none",
              onStepClick ? "cursor-pointer" : "cursor-default"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-colors duration-300",
                step.status === 'completed' ? "bg-blue-600 border-blue-600 group-hover:bg-blue-700" : "",
                step.status === 'current' ? "bg-blue-100 border-blue-600" : "",
                step.status === 'upcoming' ? "bg-gray-100 border-gray-300 group-hover:border-gray-400" : ""
              )}
            >
              {step.status === 'completed' && <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              {step.status === 'current' && <span className="text-sm sm:text-base font-semibold text-blue-600">{index + 1}</span>}
              {step.status === 'upcoming' && <span className="text-sm sm:text-base text-gray-500 group-hover:text-gray-700">{index + 1}</span>}
            </div>
            <p
              className={cn(
                "mt-2 text-xs sm:text-sm font-medium transition-colors duration-300",
                step.status === 'completed' ? "text-blue-600 group-hover:text-blue-700" : "",
                step.status === 'current' ? "text-blue-600 font-semibold" : "",
                step.status === 'upcoming' ? "text-gray-500 group-hover:text-gray-700" : ""
              )}
            >
              {step.name}
            </p>
          </button>

          {index < steps.length - 1 && (
            <div className="flex-shrink-0 text-gray-300 mx-1 sm:mx-2">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default GuidedFlowStepIndicator;