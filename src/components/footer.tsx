"use client";

import { ArrowUpRight, Heart } from "lucide-react";
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { Brand } from "@/components/brand";
import { useSite } from "@/components/site-provider";
import { socialLinks } from "@/data/content";

const socialIcons = {
  x: XIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
};

export function Footer() {
  const { openAction } = useSite();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#dce3cf] bg-[#edf1e3]">
      <div className="container-page pb-6 pt-12 md:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.8fr_1fr_1fr_1fr] lg:gap-14">
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="inline-block rounded-lg" aria-label="FoodBridge home">
              <Brand />
            </a>
            <p className="mt-4 max-w-[250px] text-xs leading-[1.9] text-[#63705a]">
              Good food belongs on plates.
              <br />
              Not in landfills. Let’s bridge the gap.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.name} (opens in a new tab)`}
                    className="flex size-8 items-center justify-center rounded-full border border-[#d6dfc9] text-[#63745a] transition-colors hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Icon className="size-3.5" />
                  </a>
                );
              })}
            </div>
          </div>
          <nav aria-label="Platform links">
            <h2 className="mb-4 text-xs font-semibold">Platform</h2>
            <ul className="space-y-3 text-xs text-[#63705a]">
              <li>
                <a className="transition-colors hover:text-primary" href="#how-it-works">
                  How It Works
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#live-rescues">
                  Find a Rescue
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="transition-colors hover:text-primary"
                  onClick={() => openAction({ type: "list" })}
                >
                  List Your Food
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="transition-colors hover:text-primary"
                  onClick={() => openAction({ type: "join" })}
                >
                  Become a Rescuer
                </button>
              </li>
            </ul>
          </nav>
          <nav aria-label="Company links">
            <h2 className="mb-4 text-xs font-semibold">Company</h2>
            <ul className="space-y-3 text-xs text-[#63705a]">
              <li>
                <a className="transition-colors hover:text-primary" href="#impact">
                  Our Impact
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#partners">
                  Our Partners
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#stories">
                  Community Stories
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#contact">
                  Get in Touch
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Legal links">
            <h2 className="mb-4 text-xs font-semibold">Legal</h2>
            <ul className="space-y-3 text-xs text-[#63705a]">
              <li>
                <button
                  type="button"
                  className="transition-colors hover:text-primary"
                  onClick={() => openAction({ type: "info", topic: "privacy" })}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="transition-colors hover:text-primary"
                  onClick={() => openAction({ type: "info", topic: "terms" })}
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="transition-colors hover:text-primary"
                  onClick={() => openAction({ type: "info", topic: "accessibility" })}
                >
                  Accessibility
                </button>
              </li>
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
            >
              Let’s do some good
              <ArrowUpRight className="size-3" />
            </a>
          </nav>
        </div>
        <div className="mt-11 flex flex-col items-center justify-between gap-3 border-t border-[#d9e1cd] pt-6 text-[10px] text-[#59674f] sm:flex-row">
          <p>© {year} FoodBridge. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with
            <Heart className="size-3 fill-[#c77963] text-[#c77963]" aria-label="love" />
            for a world with less waste.
          </p>
        </div>
      </div>
    </footer>
  );
}
