import SidebrainLogoCarousel from "@/assets/SidebrainLogoCarousel";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import ax from "@/services/axiosClient";
import { useNavigate } from "react-router-dom";
// import supabaseClient from "@/services/supabaseClient";

const LoginPage = () => {
  const navigate = useNavigate();
  // const handleClick = async () => {
  //   //
  //   const obj = await supabaseClient.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: "http://localhost:8008/auth/callback/",
  //       scopes: "openid profile",
  //     },
  //   });
  //   console.log("supabase signinwithoauth object", obj);
  // };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await ax.get("/auth/login");
      await console.log("response", response.data);
      await window.open(response.data.url);
    },
  });

  return (
    <div className="flex h-full w-full items-center justify-center gap-6 p-16 ">
      <div className="flex">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-[400px]"
        >
          <CarouselContent className="items-center">
            <CarouselItem>
              <SidebrainLogoCarousel />
            </CarouselItem>
            <CarouselItem>Some other text we can include here</CarouselItem>
            <CarouselItem>Some other onboarding stuff</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div
        id="sign-up-parent-container"
        className="flex grow flex-col items-center self-stretch px-24"
      >
        <h1 className="text-4xl ">Create and account</h1>
        <div
          id="social-login-band"
          className="flex grow flex-col items-center justify-center gap-6 self-stretch px-4"
        >
          <Button className="flex items-center justify-center gap-3 self-stretch border-gray-300 bg-white ">
            <FaApple className="" size={"24px"} color="black" />
            <p className="font-[700] leading-6 text-gray-700">
              Sign Up with Apple
            </p>
          </Button>
          <Button
            className="flex items-center justify-center gap-3 self-stretch border-gray-300 bg-white "
            onClick={() => mutation.mutate()}
          >
            <FcGoogle className="" size={"24px"} />
            <p className="font-[700] leading-6 text-gray-700">
              Sign Up with Google
            </p>
          </Button>
        </div>
        <div
          id="space-buffer"
          className="flex grow flex-col items-center justify-center gap-4 self-stretch"
        >
          <div
            id="input-field"
            className="flex flex-col items-center justify-center gap-6 self-stretch"
          >
            <div
              id="input-field-support-text"
              className="flex flex-col items-center gap-6 self-stretch"
            >
              <div
                id="input-with-label"
                className="flex flex-col items-start gap-2 self-stretch"
              >
                <p className="self-stretch text-left text-base font-semibold text-gray-900">
                  Sign Up with Phone
                </p>
                <Input type="tel" placeholder="Phone number" />
              </div>
              <p className="self-stretch text-center text-gray-500">
                Already Have An account? Click{" "}
                <a href="" className="underline underline-offset-4">
                  Here
                </a>{" "}
                to Login
              </p>
            </div>
            <Button className="self-stretch">Get OTP</Button>
          </div>
          <div className="p text-center text-gray-500">
            By Continuing further, you are agreeing to our{" "}
            <a href="" className="underline underline-offset-4">
              terms of service
            </a>{" "}
            and {""}
            <a href="" className="underline underline-offset-4">
              privacy policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
