'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current + 1) / total;
  const percentage = Math.round(progress * 100);

  return (
    <div className="mb-6">
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-center text-sm text-gray-600 font-medium mt-2">
        {percentage}% завършено
      </div>
    </div>
  );
}
