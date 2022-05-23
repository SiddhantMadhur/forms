import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { logInWithGithub, logInWithTwitter, supabase } from "../server/config";

function UnAuth() {
  const router = useRouter();
  const [github, setGithub] = useState(false);
  const [twitter, setTwitter] = useState(false);

  return (
    <div className="text-center my-5">
      <span>Create an account to start creating forms now</span>
      <div className="flex justify-center gap-y-3 flex-col my-3">
        <div>
          <button
            onClick={() => {
              router.push("/auth?type=signup");
            }}
            className="button"
          >
            Sign up with <span className="highlight">Email</span>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              router.push("/auth?type=signin");
            }}
            className="button"
          >
            Log in with <span className="highlight">Email</span>
          </button>
        </div>
        <div>
          <button
            disabled={github}
            onClick={async () => {
              setGithub(true);
              await logInWithGithub();
              setGithub(false);
            }}
            className="button"
          >
            {github ? (
              <div>
                <CircularProgress sx={{ color: "#3ecf8e" }} size={25} />
              </div>
            ) : (
              <p>
                {" "}
                Log in with <span className="highlight">GitHub</span>
              </p>
            )}
          </button>
        </div>
        <div>
          <button
            disabled={twitter}
            onClick={async () => {
              setTwitter(true);
              await logInWithTwitter();
              setTwitter(false);
            }}
            className="button"
          >
            {github ? (
              <div>
                <CircularProgress sx={{ color: "#3ecf8e" }} size={25} />
              </div>
            ) : (
              <p>
                {" "}
                Log in with <span className="highlight">Twitter</span>
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Auth() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const [forms, setForms] = useState([]);

  const user = supabase.auth.user();

  const [fetching, setFetching] = useState(true);
  const getForms = async () => {
    setFetching(true);
    if (user !== null) {
      let { data, error } = await supabase.from("forms").select("*").match({
        created_by: user.id,
      });
      console.log(data);
      setForms(data);
    }
    setFetching(false);
  };

  useEffect(() => {
    getForms();
  }, []);

  return (
    <div className="flex justify-center">
      <div>
        <div className=" mb-3">
          <button
            onClick={async () => {
              const user = supabase.auth.user();
              if (user !== null) {
                let { data, error } = await supabase.auth.signOut();
              }
            }}
            className="button"
          >
            sign out
          </button>
        </div>
        <div>
          {creating ? (
            <div className="button mx-auto">
              <div className="flex justify-center">
                <CircularProgress sx={{ color: "#3ecf8e" }} size={25} />
              </div>
            </div>
          ) : (
            <button
              onClick={async () => {
                setCreating(true);
                const user = supabase.auth.user();

                if (user) {
                  let { data, error } = await supabase.from("forms").insert({
                    created_by: user.id,
                  });
                  router.push(`/create?id=${data[0].id}`);
                }
                setCreating(false);
              }}
              className="button"
            >
              Create a Form
            </button>
          )}
        </div>
        <div className="text-center my-6">
          <div className="text-2xl mb-4">Your forms</div>
          <div>
            {fetching ? (
              <div className="my-4">
                <CircularProgress
                  sx={{
                    color: "#3ecf8e",
                  }}
                  size={30}
                />
              </div>
            ) : (
              <div>
                {forms.length === 0 ? (
                  "You haven't made anything yet."
                ) : (
                  <div className="mx-auto">
                    <div className="flex flex-col gap-y-2 ">
                      {forms.map((doc) => {
                        return (
                          <div className="bg-splightblack flex text-left max-w-[1000px] mx-auto w-[800px] py-3 rounded-md">
                            <div className="mx-5">
                              {doc.name === null ? "Unnamed" : doc.name}
                            </div>
                            <div className="flex-1 my-auto mx-2 text-right">
                              <button
                                onClick={() => {
                                  router.push(`/create?id=${doc.id}`);
                                }}
                                className=" transition hover:bg-spgray hover:text-gray-200 p-1 rounded-md  "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6  ml-auto  "
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className=" my-auto mx-2 text-right">
                              <button
                                onClick={async () => {
                                  setFetching(true)
                                  if (user) {
                                    let { data, error } = await supabase
                                      .from("forms")
                                      .delete()
                                      .match({
                                        created_by: user.id,
                                        id: doc.id,
                                      });
                                    getForms()
                                  }
                                }}
                                className=" transition hover:bg-error hover:text-gray-200 p-1 rounded-md  "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 "
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function IndexPage() {
  const user = supabase.auth.user();

  useEffect(() => {
    supabase.auth.onAuthStateChange(() => {
      window.location.assign("/");
    });
  }, []);

  return (
    <div className="my-5">
      <div className="text-center text-3xl my-3 font-bold">Tecna Forms</div>
      {user ? <Auth /> : <UnAuth />}
    </div>
  );
}

export default IndexPage;
