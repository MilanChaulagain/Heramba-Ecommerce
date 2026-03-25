"use client";

import { useState } from "react";

export default function ProductQuestions() {
  const [question, setQuestion] = useState("");

  const mockQuestions = [
    {
      id: 1,
      question: "Does this come in different sizes?",
      answer: "Yes, sizes are available.",
      askedBy: "Maya",
      askedAt: "3 days ago",
    },
    {
      id: 2,
      question: "Is this product waterproof?",
      answer: "Yes, it is water resistant.",
      askedBy: "Rohan",
      askedAt: "1 week ago",
    },
  ];

  const handleSubmit = () => {
    console.log("Question:", question);
    setQuestion("");
  };

  const isSubmitDisabled = question.trim().length === 0;

  return (
    <section className="mt-8 ml-5 mr-5 border-t border-gray-200 pt-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Questions & Answers</h2>
      </div>

      {/* Questions List */}
      <div className="mb-6 space-y-3">
        {mockQuestions.map((item) => (
          <article
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                Q
              </span>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-900">{item.question}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {item.askedBy} • {item.askedAt}
                </p>
              </div>
            </div>

            <div className="mt-3 ml-9 rounded-lg bg-gray-50 p-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">A:</span> {item.answer}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Ask Question Form */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="text-lg font-bold text-gray-900">Ask a Question</h3>

        <div className="mt-4 space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black/20"
          />

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Keep it clear and specific</span>
            <span>{question.length}/300</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setQuestion("")}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}