"use client";
import React from "react";
import { ArrowRight, MousePointerClick, Settings, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Define Your Agent",
      description:
        "Give your agent a name and describe its purpose. Our AI suggests the initial structure.",
      icon: Settings,
    },
    {
      title: "Visually Build Logic",
      description:
        "Use our intuitive drag-and-drop builder to define workflows, tools, and decision paths.",
      icon: MousePointerClick,
    },
    {
      title: "One-Click Deploy",
      description:
        "Deploy your agent instantly. Integrate it into your apps via API or share a direct link.",
      icon: Rocket,
    },
  ];

  return (
    <section id="how-it-works" className="container py-20 px-4 md:px-6">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">
          How It Works
        </h2>
        <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
          Building powerful AI agents has never been easier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-10"></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4 relative bg-background p-4"
          >
            <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center border-4 border-background shadow-sm">
              <step.icon className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
