import ShellContainer from "@src/containers/shellContainer";
import { Outlet } from "react-router-dom";

const Deals = () => {
  return (
    <ShellContainer className="gap-4  !h-full sm:!px-0  !min-h-screen">
      <Outlet />
    </ShellContainer>
  );
};

export default Deals;
