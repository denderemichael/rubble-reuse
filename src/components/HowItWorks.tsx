import { Card, CardContent } from "@/components/ui/card";
import { Camera, Search, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Camera,
    step: "1",
    title: "List Materials",
    description: "Take photos, add details, and post your surplus construction materials in minutes.",
  },
  {
    icon: Search,
    step: "2",
    title: "Browse & Search",
    description: "Find what you need nearby using filters, map view, and smart recommendations.",
  },
  {
    icon: Truck,
    step: "3",
    title: "Arrange Pickup",
    description: "Schedule pickup time, get delivery quotes, or self-collect from supplier.",
  },
  {
    icon: CheckCircle,
    step: "4",
    title: "Complete & Rate",
    description: "Confirm transaction, track sustainability impact, and rate your experience.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to reduce waste and save money
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <Card 
              key={index} 
              className="relative border-2 hover:border-primary transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="pt-6 space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto">
                    <item.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
