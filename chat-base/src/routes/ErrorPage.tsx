import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="flex w-full justify-center">
      <div className="m-8 flex w-1/3 flex-col gap-16 rounded-lg bg-gray-300 p-8">
        <h1>Ooops!</h1>
        <p>Something went wrong navigating you to the homepage</p>
        <Button onClick={handleClick}>Go back to Home</Button>
      </div>
    </div>
  );
};

export default ErrorPage;
