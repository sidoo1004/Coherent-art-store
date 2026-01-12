"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mockCollections } from "@/lib/data/mockData";

interface QuizQuestion {
  id: string;
  question: string;
  type: "single" | "multiple" | "color";
  options: string[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "rooms",
    question: "Which spaces need the most help?",
    type: "multiple",
    options: ["Living Room", "Bedroom", "Dining Room", "Home Office", "Kitchen", "Hallways"]
  },
  {
    id: "frustration",
    question: "What's your biggest frustration with home decor?",
    type: "single",
    options: [
      "Too many choices - I get overwhelmed",
      "Nothing seems to match",
      "Don't have time to shop around",
      "Unsure what will look good together"
    ]
  },
  {
    id: "mood",
    question: "What mood do you want in your home?",
    type: "single",
    options: ["Calming & Serene", "Energizing & Bold", "Sophisticated & Elegant", "Warm & Inviting"]
  },
  {
    id: "style",
    question: "Which style resonates with you?",
    type: "single",
    options: ["Abstract Minimalism", "Impressionist Realism", "Bold Contemporary"]
  },
  {
    id: "colors",
    question: "Pick colors that speak to you",
    type: "color",
    options: ["#e8dcc4", "#7a9eb8", "#ff6b6b", "#8b7355", "#6c5ce7", "#00b894", "#c9b8a0", "#2d3436"]
  },
  {
    id: "roomCount",
    question: "How many rooms are you decorating?",
    type: "single",
    options: ["Just 1-2 rooms", "3-4 rooms", "5+ rooms (whole home)"]
  },
  {
    id: "budget",
    question: "What's your investment comfort zone?",
    type: "single",
    options: ["Budget-Friendly ($89-149)", "Premium Quality ($150-249)", "Luxury Investment ($250-399)"]
  }
];

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [email, setEmail] = useState("");

  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answer: string) => {
    if (currentQuestion.type === "multiple") {
      const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
      const newAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((a) => a !== answer)
        : [...currentAnswers, answer];
      setAnswers({ ...answers, [currentQuestion.id]: newAnswers });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: answer });
    }
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "multiple") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz complete, navigate to results
      const queryParams = new URLSearchParams({
        style: answers.style as string,
        mood: answers.mood as string,
        budget: answers.budget as string,
      });
      router.push(`/quiz/results?${queryParams}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-warm to-background flex items-center justify-center py-12">
      <div className="container-custom max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentStep + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-medium text-accent">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8">
              {currentQuestion.question}
            </h2>

            {/* Single/Multiple Choice Options */}
            {(currentQuestion.type === "single" || currentQuestion.type === "multiple") && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected =
                    currentQuestion.type === "multiple"
                      ? (answers[currentQuestion.id] as string[])?.includes(option)
                      : answers[currentQuestion.id] === option;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`
                        w-full text-left p-4 rounded-lg border-2 transition-all
                        ${
                          isSelected
                            ? "border-accent bg-accent/5 shadow-md"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${isSelected ? "border-accent bg-accent" : "border-gray-300"}
                        `}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-primary">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Color Picker */}
            {currentQuestion.type === "color" && (
              <div className="grid grid-cols-4 gap-4">
                {currentQuestion.options.map((color) => {
                  const isSelected = (answers[currentQuestion.id] as string[])?.includes(color);

                  return (
                    <button
                      key={color}
                      onClick={() => handleAnswer(color)}
                      className={`
                        aspect-square rounded-xl transition-all
                        ${
                          isSelected
                            ? "ring-4 ring-accent scale-110"
                            : "ring-2 ring-gray-200 hover:ring-accent hover:scale-105"
                        }
                      `}
                      style={{ backgroundColor: color }}
                    >
                      {isSelected && (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white drop-shadow-lg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 0 && (
                <button onClick={handleBack} className="btn-outline flex-1">
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === quizQuestions.length - 1 ? "See My Matches" : "Next"}
              </button>
            </div>

            {currentQuestion.type === "multiple" && (
              <p className="text-sm text-gray-600 mt-4 text-center">
                Select all that apply
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
