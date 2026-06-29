import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GOOGLE_FORM_URL } from "@/constants";
import { Search, Shapes } from "lucide-react";

export default function AboutPage() {
  const handleOpenForm = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          About Handpicked
        </h1>
        <p className="text-muted-foreground text-lg">
          The internet has no shortage of tools. It has a shortage of good
          judgment. Handpicked exists to close that gap: a continuously
          maintained collection of resources across design, development, AI,
          learning, and workflows, organized for clarity and chosen for quality.
        </p>
      </div>

      <Separator className="my-8" />

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-muted-foreground">
            Our mission is simple: reduce the cost of finding good tools. Every
            resource here has been evaluated, not just collected. We do not
            optimize for volume. We optimize for usefulness.
          </p>
        </div>
        <Card className="border-green-500/20 bg-green-500/5 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-green-600">
              100% Curated
            </h3>
            <p className="text-muted-foreground">
              Every entry is reviewed - nothing gets in by default.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8" />

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          What Makes Handpicked Different?
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "Curated, Not Aggregated",
              desc: "Every entry is reviewed - nothing gets in by default.",
            },
            {
              title: "Broad but Organized",
              desc: "Covers AI, design, dev, learning, databases, and more - without the sprawl.",
            },
            {
              title: "Always Current",
              desc: "Resources are revisited, removed, and refreshed. This is not a graveyard.",
            },
            {
              title: "Open to Contribution",
              desc: "Quality standards stay high. The door stays open.",
            },
          ].map((item) => (
            <Card key={item.title} className="transition hover:shadow-lg">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Call to Action */}
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-3">
          Know something we don't? 🚀
        </h2>
        <p className="text-muted-foreground mb-6">
          Handpicked gets better when good people add to it. Submit a
          resource, flag something outdated, or share what has been useful in
          your work.
        </p>

        {/* Updated Button */}
        <div className="flex gap-4 flex-wrap align-middle justify-center">
          <Button size="lg" asChild>
            <a href="/">
              <Search /> Explore Collections
            </a>
          </Button>
          <Button size="lg" variant="secondary" onClick={handleOpenForm}>
            <Shapes />
            Submit Resource
          </Button>
        </div>
      </div>
    </div>
  );
}
