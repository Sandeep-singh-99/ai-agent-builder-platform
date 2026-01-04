"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Ready to Automate Your Workflow?
        </h2>
        <p className="text-primary-foreground/80 max-w-[600px] mx-auto text-lg">
          Join thousands of developers building the future of AI. Start creating
          your intelligent agents today.
        </p>
        <Link href="/dashboard">
          <Button size="lg" variant="secondary" className="h-12 px-8 text-base">
            Start Building Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
