import { FC } from "react";

interface IProps {
  isLoading: boolean;
}

export const LoadingMacroGrid: FC<IProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div role="status" className="w-full animate-pulse">
      <div className="my-2 h-32 rounded bg-card dark:bg-primary-dark"></div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <div className="h-32 rounded bg-card dark:bg-primary-dark"></div>
        <div className="h-32 rounded bg-card dark:bg-primary-dark"></div>
        <div className="h-32 rounded bg-card dark:bg-primary-dark"></div>
        <div className="h-32 rounded bg-card dark:bg-primary-dark"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
