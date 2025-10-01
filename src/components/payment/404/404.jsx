import { Loader } from "../../loader/Loader";
import { lazy, Suspense } from "react";

import { DescriptionError } from "./descriptionError";

export const BackendError = () => {
  return (
    <div>
      <DescriptionError />
    </div>
  );
};
