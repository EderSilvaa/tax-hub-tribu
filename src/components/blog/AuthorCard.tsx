import React from "react";

interface Author {
  name: string;
  role: string;
  avatar?: string;
  initials: string;
}

interface AuthorCardProps {
  author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar Circle */}
      <div className="relative">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-border"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm border-2 border-border">
            {author.initials}
          </div>
        )}
      </div>

      {/* Author Info */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {author.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {author.role}
        </span>
      </div>
    </div>
  );
};

export default AuthorCard;
