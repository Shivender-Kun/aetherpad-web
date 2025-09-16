import errorProcessor from "./errorProcessor";

type ERROR_HANDLER_PROPS<T> = {
  apiCall: () => Promise<T>;
  setIsLoading?: (val: boolean) => void;
};

const errorHandler = async <T>({
  apiCall,
  setIsLoading,
}: ERROR_HANDLER_PROPS<T>) => {
  try {
    if (setIsLoading) setIsLoading(true);
    return await apiCall();
  } catch (error) {
    console.error(errorProcessor(error));
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export default errorHandler;
