import React from "react";
import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import { AuthProvider } from "libs/hooks/useAuth";
import ApplicationError from "../../components/app/ui/ApplicationError";

export const AuthLayout = () => {
  const outlet = useOutlet();

  const { userPromise } = useLoaderData();
  return (
    <Suspense>
      <Await
        resolve={userPromise}
        errorElement={<ApplicationError />}
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};
