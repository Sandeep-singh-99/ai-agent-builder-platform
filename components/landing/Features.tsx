"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bot,
  Zap,
  Code,
  LayoutDashboard,
  Share2,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Drag & Drop Builder",
    description:
      "Visually design your agent workflows with our intuitive drag-and-drop interface.",
    icon: LayoutDashboard,
  },
  {
    title: "AI Powered",
    description:
      "Leverage state-of-the-art LLMs to give your agents true intelligence and reasoning capabilities.",
    icon: Bot,
  },
  {
    title: "Instant Deployment",
    description:
      "Deploy your agents to the cloud with a single click. No infrastructure to manage.",
    icon: Zap,
  },
  {
    title: "Custom Functions",
    description:
      "Extend capabilities with custom code blocks and API integrations.",
    icon: Code,
  },
  {
    title: "Team Collaboration",
    description:
      "Share your agents with your team and collaborate in real-time.",
    icon: Share2,
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and security protocols to keep your data safe.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section id="features" className="container py-20 px-4 md:px-6">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">
          Powerful Features for Modern Agents
        </h2>
        <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
          Everything you need to build, test, and deploy production-ready AI
          agents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="border-0 shadow-none bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
