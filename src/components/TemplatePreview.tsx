import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface TemplatePreviewProps {
  href: string;
  children: React.ReactNode;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ href, children }) => {
  return (
    <Button
      variant="outline"
      className="w-full sm:flex-1 gap-2"
      onClick={() => window.open(href, "_blank")}
    >
      <Eye size={16} />
      {children}
    </Button>
  );
};

export default TemplatePreview;
