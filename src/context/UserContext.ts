import { UserData } from "@/components/general/schema";
import { createContext } from "react";

interface IUserContext {
  userData: UserData;
  setUserData: (obj: UserData) => void;
}

export const defaultUserValue: UserData = {
  age: 18,
  first_name: "Lamie",
  last_name: "Nguyen",
  background: null,
  metrics: null,
  relationships: [],
};

const UserContext = createContext<IUserContext>({
  userData: defaultUserValue,
  setUserData: () => {},
});

export default UserContext;
