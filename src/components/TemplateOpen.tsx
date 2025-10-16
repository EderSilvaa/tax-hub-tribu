import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface TemplateOpenProps {
  url: string;
  free?: boolean;
  children?: React.ReactNode;
}

const TemplateOpen: React.FC<TemplateOpenProps> = ({ url, free = false, children }) => {
  return (
    <Button
      variant="default"
      className="w-full sm:flex-1 gap-2"
      onClick={() => window.open(url, "_blank")}
    >
      <ExternalLink size={16} />
      {children || (free ? "Open Source (Free)" : "Open Template")}
    </Button>
  );
};

export default TemplateOpen;
