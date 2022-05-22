import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { logInWithGithub, supabase } from "../server/config";

function UnAuth() {
  const router = useRouter();

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
          <button onClick={logInWithGithub} className="button">
            Log in with <span className="highlight">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Auth() {
  return (
    <div className="flex justify-center">
      <div>
        <div className="text-center text-spgray hover:text-spgraydark transition mb-3">
          <button
            onClick={async () => {
              const user = supabase.auth.user();
              if (user !== null) {
                let { data, error } = await supabase.auth.signOut();
              }
            }}
          >
            sign out
          </button>
        </div>
        <div>
          <button className="button">Create a Form</button>
        </div>
      </div>
    </div>
  );
}

function IndexPage() {
  const user = supabase.auth.user();


  useEffect(() => {
    supabase.auth.onAuthStateChange(()=>{
      window.location.assign('/')
    })
  }, []);

  return (
    <div className="my-5">
      <div className="text-center text-3xl my-3 font-bold">Tecna Forms</div>
      {user ? <Auth /> : <UnAuth />}
    </div>
  );
}

export default IndexPage;
