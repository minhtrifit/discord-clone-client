import Image from "next/image";

import RegisterForm from "@/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="bg-cover min-h-screen bg-[url('/images/login.png')] flex flex-col items-center justify-center">
      <div className="text-white bg-secondary-gray px-8 py-6 rounded-md flex flex-wrap justify-center gap-10 md:gap-[80px] m-5">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
