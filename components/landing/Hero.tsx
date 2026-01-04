"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 md:py-32 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[100px] -z-10"></div>

      <div className="container px-4 md:px-6 text-center space-y-8">
        <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm dark:border-gray-800 dark:bg-gray-950/50">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-muted-foreground mr-1">New:</span>
          <span className="font-medium">Multi-Agent Workflows</span>
          <ArrowRight className="ml-2 h-4 w-4 text-muted-foreground" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary max-w-4xl mx-auto leading-[1.1]">
          Build Autonomous <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-violet-600">
            AI Agents
          </span>{" "}
          in Minutes
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create, deploy, and manage intelligent AI agents with our
          drag-and-drop builder. No coding required. Automate your workflows
          today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-12 px-8 text-base rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
            >
              Start Building Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#demo">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base rounded-full"
            >
              View Demo
            </Button>
          </Link>
        </div>

        {/* Placeholder for Hero Image/Dashboard Preview */}
        <div className="mt-12 relative mx-auto max-w-5xl w-full rounded-xl border bg-background/50 p-2 shadow-2xl backdrop-blur-sm">
          <div className="aspect-video w-full rounded-lg bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 border flex items-center justify-center overflow-hidden">
            <div className="text-center space-y-2">
              <Sparkles className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
              <p className="text-muted-foreground font-medium">
                Interactive App Preview
              </p>
            </div>
          </div>
          {/* Optional glow effect behind the image */}
          <div className="absolute inset-0 -z-10 bg-linear-to-tr from-blue-500/10 via-purple-500/10 to-transparent blur-2xl rounded-xl"></div>
        </div>
      </div>
    </section>
  );
}
