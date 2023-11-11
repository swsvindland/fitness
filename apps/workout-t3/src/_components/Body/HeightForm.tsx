import { FC, FormEvent, useState } from "react";
import { TextField } from "../TextFields/TextField";
import { Button } from "../Buttons/Button";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHeight } from "@fitness/api-legacy";
import { useRouter } from "next/navigation";

export const HeightForm: FC = () => {
  const [height, setHeight] = useState<string>("");
  const userId = localStorage.getItem("userId") ?? "";
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation(addHeight, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["UserHeight"]);
      await queryClient.invalidateQueries(["Dashboard"]);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ height: parseFloat(height), userId });
    router.back();
  };

  const handleClear = () => {
    setHeight("");
  };

  return (
    <div className="m-4">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit}>
          <div className="card w-80 overflow-hidden rounded shadow">
            <div className="p-4">
              <TextField
                id="height"
                type="number"
                inputMode="decimal"
                label="Height"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
            <div className="flex justify-between bg-primary-dark px-4 py-3 text-right dark:bg-background sm:px-6">
              <SecondaryButton onClick={handleClear}>Clear</SecondaryButton>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
