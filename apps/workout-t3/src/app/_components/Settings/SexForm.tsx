import { FC, FormEvent, useContext, useState } from "react";
import { Button } from "../Buttons/Button";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../Auth/Auth";
import { useHistory } from "react-router-dom";
import { updateSex } from "@fitness/api-legacy";
import { useShowBackButton } from "../Navigation/headerHooks";
import { Sex, User } from "@fitness/types";

export const SexForm: FC = () => {
  const { user, setUser } = useContext(AuthContext);
  useShowBackButton();
  const [sex, setSex] = useState<Sex>(user?.sex ?? Sex.Unknown);
  const queryClient = useQueryClient();
  const history = useHistory();

  const mutation = useMutation(updateSex, {
    onSuccess: async () => {
      if (user) {
        const newUser: User = { ...user, sex };
        setUser(newUser);
      }
      await queryClient.invalidateQueries(["User", user?.id]);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ sex });
    history.goBack();
  };

  const handleClear = () => {
    setSex(user?.sex ?? Sex.Unknown);
  };

  return (
    <div className="container">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit}>
          <div className="card overflow-hidden rounded shadow">
            <div className="p-4">
              <div className="flex items-center">
                <input
                  id="sex-male"
                  name="sex-male"
                  type="radio"
                  checked={sex === Sex.Male}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSex(Sex.Male);
                    }
                  }}
                  className="h-4 w-4 border-ternary accent-secondary"
                />
                <label
                  htmlFor="sex-male"
                  className="ml-3 block text-sm font-medium text-ternary"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sex-female"
                  name="sex-female"
                  type="radio"
                  checked={sex === Sex.Female}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSex(Sex.Female);
                    }
                  }}
                  className="h-4 w-4 border-ternary accent-secondary"
                />
                <label
                  htmlFor="sex-female"
                  className="ml-3 block text-sm font-medium text-ternary"
                >
                  Female
                </label>
              </div>
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
