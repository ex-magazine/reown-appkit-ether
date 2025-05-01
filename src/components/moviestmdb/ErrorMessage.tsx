import { IoAlertCircleOutline } from 'react-icons/io5';
import { Button } from './ui/button';

interface Props {
  message: string;
  reset?: () => void;
}

const ErrorMessage = ({ reset }: Props) => {
  return (
    <div className="container">
      <div className="mx-auto flex max-w-[500px] flex-col items-center text-center">
        <IoAlertCircleOutline className="h-20 w-20 text-rose-500" />

        <h1 className="mb-2 mt-4 text-xl">Some thing went wrong!</h1>
        <p>
          Please try again later. If the problem persists, please contact
          support.
        </p>
        <Button variant="outline" className="mt-4" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorMessage;
