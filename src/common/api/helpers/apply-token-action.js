import { getCurrentUser } from "../../storage";

const applyTokenAction = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return "";

  return "Bearer " + currentUser.Token;
};

export default applyTokenAction;
