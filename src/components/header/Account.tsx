import { Button } from "../ui/button";
import { Link } from "react-router";
import RouterResponsive from "./RouterResponsive";

const Account = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant={"outline"}>
        <Link to={"/login"}>Đăng nhập</Link>
      </Button>
      <Button variant={"destructive"}>
        <Link to={"/register"}>Đăng ký</Link>
      </Button>
      <RouterResponsive />
    </div>
  );
};

export default Account;
