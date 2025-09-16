import React from "react";

interface PageHeaderProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
}

const PageHeader = ({
  children,
  className = "",
  title = "Title",
}: PageHeaderProps) => {
  return (
    <div
      className={`flex min-h-9 flex-wrap items-center justify-between gap-4 px-3 ${className}`}
    >
      <h2 className="text-xl">{title}</h2>
      {children}
    </div>
  );
};

export default PageHeader;
