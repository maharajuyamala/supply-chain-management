import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { AuthCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import classNames from "classnames";
import { IoIosClose } from "react-icons/io";

interface FormProps {
  onClose: () => void;
}

interface Error {
  message: string;
  status: string;
}

interface UserCredential {
  user: {
    reloadUserInfo: { email: string };
  };
}

const LoginForm: React.FC<FormProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState({ message: "", status: "" });

  const messages = {
    ["invalid-credential"]: "username/password is invalid",
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // TODO: Need to interface
        const email = userCredential?.user?.reloadUserInfo?.email;
        localStorage.setItem("email", email);
        onClose();
      })
      .catch((error) => {
        console.log(error.message);
        setShow({
          message: error.message.includes("auth/invalid-credential") ? messages["invalid-credential"] : error.message,
          status: "error",
        });
        const errorMessage = error.message;
      });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          setShow({ message: "Account created", status: "success" });

          // ...
        })
        .catch((error) => {
          setShow({ message: error.message, status: "error" });
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error signing up:", errorMessage);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShow({ message: "", status: "" });
    }, 50000);
  }, [show]);

  return (
    <div
      className=" fixed bottom-0 left-0 right-0 top-0 mx-auto flex h-full w-full  items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <form
        onSubmit={handleLogin}
        onClick={(e) => e.stopPropagation()}
        className="relative mb-4 max-w-xs rounded bg-white px-8 pb-8 pt-6 shadow-md "
      >
        <div className="absolute right-3 top-3 cursor-pointer text-xl" onClick={onClose}>
          <IoIosClose />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="mb-1 block text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p
            className={classNames(
              "pt-3 text-xs ",
              show?.status == "error" ? "text-red-600" : "text-green-600",
              !show?.message && "opacity-0",
            )}
          >
            {show?.message || "hidden text"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Sign In
          </button>
          <button
            className="focus:shadow-outline rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400 focus:outline-none"
            onClick={handleSignup}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
