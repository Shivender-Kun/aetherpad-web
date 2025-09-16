import React from "react";

interface PageWrapperProps {
  children?: React.ReactNode;
  classNames?: string;
}

const PageWrapper = ({ children, classNames = "" }: PageWrapperProps) => {
  return (
    <div
      className={`bg-card flex h-full flex-col gap-4 overflow-auto rounded-lg p-4 ${classNames}`}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
