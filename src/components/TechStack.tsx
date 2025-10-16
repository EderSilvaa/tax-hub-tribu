import React from "react";

interface TechStackProps {
  technologies: string[];
}

const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  const techIcons: Record<string, { icon: string; name: string; color: string }> = {
    nextjs: {
      icon: "⚡",
      name: "Next.js",
      color: "bg-black dark:bg-white text-white dark:text-black",
    },
    react: {
      icon: "⚛️",
      name: "React",
      color: "bg-[#61DAFB] text-black",
    },
    typescript: {
      icon: "📘",
      name: "TypeScript",
      color: "bg-[#3178C6] text-white",
    },
    tailwindcss: {
      icon: "🎨",
      name: "Tailwind CSS",
      color: "bg-[#06B6D4] text-white",
    },
    shadcn: {
      icon: "🎭",
      name: "shadcn/ui",
      color: "bg-black dark:bg-white text-white dark:text-black",
    },
    nodejs: {
      icon: "🟢",
      name: "Node.js",
      color: "bg-[#339933] text-white",
    },
    express: {
      icon: "🚂",
      name: "Express",
      color: "bg-[#000000] text-white",
    },
    mongodb: {
      icon: "🍃",
      name: "MongoDB",
      color: "bg-[#47A248] text-white",
    },
  };

  return (
    <div className="flex flex-wrap gap-3 my-6">
      {technologies.map((tech) => {
        const techData = techIcons[tech.toLowerCase()];
        if (!techData) return null;

        return (
          <div
            key={tech}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-transform hover:scale-105 ${techData.color}`}
          >
            <span className="text-lg">{techData.icon}</span>
            <span>{techData.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
