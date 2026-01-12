import { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card p-6">
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-lg">★</span>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      {/* Customer Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
          {testimonial.image}
        </div>
        <div>
          <p className="font-semibold text-primary">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
