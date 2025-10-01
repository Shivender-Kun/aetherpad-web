import React from "react";

interface PageContentProps {
  children?: React.ReactNode;
  classNames?: string;
}

const PageContent = ({ children, classNames = "" }: PageContentProps) => {
  return (
    <div className={`flex h-full flex-col gap-4 ${classNames}`}>{children}</div>
  );
};

export default PageContent;
