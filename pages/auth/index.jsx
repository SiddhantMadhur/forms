import { CircularProgress } from "@mui/material";
import React from "react";
import { useState } from "react";
import { supabase } from "../../server/config";
import Link from "next/link";

function OldUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const [createUserInput, setCreateUserInput] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      {<p className="text-success">{success}</p>}
      {<p className="text-error">{error}</p>}
      <form
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();
          const user = supabase.auth.user();
          if (user === null) {
            let { data, error } = await supabase.auth.signIn({
              email: createUserInput.email,
              password: createUserInput.password,
            });
            if (error) {
              setError(error.message);
            } else {
              setSuccess("We're signing you in... Just give us a second...");
            }
          }
          setLoading(false);
        }}
        className="flex flex-col gap-y-2"
      >
        <input className="inputbox"
          onChange={(e) =>
            setCreateUserInput({
              ...createUserInput,
              email: e.target.value,
            })
          }
          placeholder="Email"
          type="email"
        />
        <input className="inputbox"
          onChange={(e) =>
            setCreateUserInput({
              ...createUserInput,
              password: e.target.value,
            })
          }
          placeholder="Password"
        />

        {loading ? (
          <div className="button border-0 mx-auto">
            <div className="flex justify-center">
              <CircularProgress
                sx={{
                  color: "#3ecf8e",
                }}
                size={30}
              />
            </div>
          </div>
        ) : (
          <button type="submit" className="button mx-auto ">
            Create Account
          </button>
        )}
      </form>

      <a
        href="/auth?type=signup"
        className="text-spgray text-sm text-center flex justify-center my-2 hover:text-spgraydark transition"
      >
        Dont have an account?<u>Sign up</u>.
      </a>
    </>
  );
}

function NewUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const [createUserInput, setCreateUserInput] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  return (
    <>
      {<p className="text-success whitespace-normal w-[50%] mx-auto text-sm">{success}</p>}
      {<p className="text-error whitespace-normal w-[50%] mx-auto text-sm">{error}</p>}
      <form
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();
          const user = supabase.auth.user();
          if (
            user === null &&
            createUserInput.password.match(createUserInput.repeatPassword)
          ) {
            let { data, error } = await supabase.auth.signUp({
              email: createUserInput.email,
              password: createUserInput.password,
            });
            if (error) {
              setError(error.message);
            } else {
              setSuccess(
                "You have almost finished creating your account! Please check your mail to verify your account."
              );
            }
          }
          setLoading(false);
        }}
        className="flex flex-col gap-y-2"
      >
        <input className="inputbox"
          onChange={(e) =>
            setCreateUserInput({
              ...createUserInput,
              email: e.target.value,
            })
          }
          placeholder="Email"
          type="email"
        />
        <input className="inputbox"
          onChange={(e) =>
            setCreateUserInput({
              ...createUserInput,
              password: e.target.value,
            })
          }
          placeholder="Password"
        />
        <input className="inputbox"
          onChange={(e) =>
            setCreateUserInput({
              ...createUserInput,
              repeatPassword: e.target.value,
            })
          }
          placeholder="Repeat Password"
        />
        {loading ? (
          <div className="button border-0 mx-auto">
            <div className="flex justify-center">
              <CircularProgress
                sx={{
                  color: "#3ecf8e",
                }}
                size={30}
              />
            </div>
          </div>
        ) : (
          <button type="submit" className="button mx-auto ">
            Create Account
          </button>
        )}
      </form>

      <a
        href="/auth?type=signin"
        className="text-spgray text-sm text-center flex justify-center my-2 hover:text-spgraydark transition"
      >
        Already have an account? Sign in.
      </a>
    </>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;
  return {
    props: {
      query: query,
    },
  };
}

function AuthPage({ query }) {
  return (
    <div className="h-screen grid place-items-center">
      <div>
        <Link href="/">
          <a className="text-sm text-blue-500 hover:text-blue-800 transition">
            {"<-- go back"}{" "}
          </a>
        </Link>
        <div className=" bg-[#2A2A2A] px-5 py-2  rounded-md border-2 border-[#333333]  filter drop-shadow-lg  ">
          <div className="text-xl text-center font-bold mt-1 mb-3">Sign Up</div>
          <div className="text-sm"></div>
          {query.type === "signup" ? <NewUser /> : <OldUser />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
