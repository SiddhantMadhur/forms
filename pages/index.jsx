import { useRouter } from "next/router";
import React from "react";

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
          <button className="button">
            Log in with <span className="highlight">Email</span>
          </button>
        </div>
        <div>
          <button className="button">
            Log in with <span className="highlight">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function IndexPage() {
  return (
    <div className="my-5">
      <div className="text-center text-3xl  font-bold">Tecna Forms</div>
      <UnAuth />
    </div>
  );
}

export default IndexPage;
