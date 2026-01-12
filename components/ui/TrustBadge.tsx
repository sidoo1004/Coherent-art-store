interface TrustBadgeProps {
  icon: string;
  text: string;
  subtext?: string;
}

export default function TrustBadge({ icon, text, subtext }: TrustBadgeProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
      <div className="text-2xl flex-shrink-0">{icon}</div>
      <div>
        <p className="font-medium text-primary text-sm">{text}</p>
        {subtext && <p className="text-xs text-gray-600 mt-1">{subtext}</p>}
      </div>
    </div>
  );
}
