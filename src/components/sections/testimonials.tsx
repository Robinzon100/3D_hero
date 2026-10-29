import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <section id="stories" aria-labelledby="stories-heading" className="section-space bg-[#f5f6eb]">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">THE PEOPLE BEHIND THE PLATES</p>
          <h2 id="stories-heading" className="section-title">
            What People Say
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-[15px]">
            Different roles. One shared belief: good food brings us together.
          </p>
        </Reveal>
        <Stagger className="mt-11 grid gap-5 md:grid-cols-3">
          {testimonials.map((person) => (
            <StaggerItem key={person.name} className="h-full">
              <Card className="card-interactive h-full shadow-none">
                <CardContent className="flex h-full flex-col p-6 lg:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className="flex gap-0.5 text-[#a17c35]"
                      role="img"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className="size-3 fill-current"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <Quote className="size-6 text-[#c8d4bc]" strokeWidth={1.3} />
                  </div>
                  <blockquote className="mb-7 text-sm leading-[1.9] text-[#515b4b]">
                    “{person.quote}”
                  </blockquote>
                  <div className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${person.color}`}
                      aria-hidden="true"
                    >
                      {person.initials}
                    </span>
                    <div>
                      <p className="text-xs font-semibold">{person.name}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{person.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-center text-[10px] text-muted-foreground">
          Meet our illustrative community — a glimpse of the change we can make together.
        </p>
      </div>
    </section>
  );
}
