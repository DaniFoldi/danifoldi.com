"use client";
import React, { useEffect, useState } from "react";
import "nes.css/css/nes.min.css";
import { Press_Start_2P } from "next/font/google";
import { adventureAction } from "./actions";

type StoryItem = { role: string; content: string };

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function AdventurePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [story, setStory] = useState<StoryItem[]>([]);

  useEffect(() => {
    (async () => {
      const data = await adventureAction([]);
      setStory(data);
      setIsLoading(false);
    })();
  }, []);

  async function step(value: "A" | "B" | "C") {
    setIsLoading(true);
    const newStory = [
      ...story,
      { role: "user", content: `I choose ${value}!` },
    ];
    setStory(newStory);
    const data = await adventureAction(newStory);
    setStory(data);
    setIsLoading(false);
  }

  return (
    <div
      className={`flex flex-col gap-6 max-w-2xl mx-auto py-8 px-2 ${pressStart2P.className}`}
    >
      <div className="bg-gray-200 is-centered nes-container with-title">
        <p className="title">Welcome, adventurer!</p>
        <p>This is a text-based adventure game running on Cloudflare Workers</p>
        <p>It uses Workers AI to generate the stories.</p>
        <p>
          Read about it {" "}
          <a
            href="https://danifoldi.com/blog/posts/adventure"
            className="underline text-blue-600 hover:text-blue-800"
            target="_blank"
          >
            here
          </a>
          .
        </p>
      </div>
      <section className="message-list flex flex-col gap-4">
        {story.slice(1).map((item, index) => {
          console.log(item)
          if (item.role === "assistant") {
            const isFirst = index === 0;
            const isLast = index === story.length - 2;
            return (
              <React.Fragment key={index}>
                <div
                  className={`from-left nes-balloon${isFirst ? " is-primary" : ""}`}
                >
                  {item.content
                    ?.split(/\n/)
                    .filter(Boolean)
                    .map((paragraph, i) => (
                      <p className="leading-normal mb-2" key={i}>
                        {paragraph}
                      </p>
                    ))}
                </div>
                {isLast && (
                  <div className="bg-gray-200 gap-4 grid grid-cols-3 group justify-items-stretch nes-container">
                    {["A", "B", "C"].map((v) => (
                      <button
                        key={v}
                        className={`is-primary nes-btn${isLoading ? " is-disabled" : ""}`}
                        disabled={isLoading}
                        type="button"
                        onClick={() => step(v as "A" | "B" | "C")}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          } else if (item.role === "user") {
            return (
              <div className="from-right nes-balloon" key={index}>
                <p>{item.content}</p>
              </div>
            );
          }
          return null;
        })}
        {isLoading && (
          <div className="bg-gray-400 nes-container">
            <p>Loading...</p>
          </div>
        )}
      </section>
    </div>
  );
}
