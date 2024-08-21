import { Link } from "react-router-dom";

export const Header = (): JSX.Element => {
  return (
    <header className="bg-white shadow-md border-b border-blue-500">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link to={"/"}>
          <h1 className="text-xl md:text-2xl font-bold text-blue-900">
            가상 면접 사이트
          </h1>
        </Link>
        <nav>
          <ul className="flex space-x-2 md:space-x-4">
            <li>
              <Link to={"/"}>
                <div className="text-blue-500 hover:underline cursor-pointer">
                  메인 페이지
                </div>
              </Link>
            </li>
            <li>
              <Link to={"/feedBack"}>
                <div className="text-blue-500 hover:underline cursor-pointer">
                  피드백
                </div>
              </Link>
            </li>
            <li>
              <Link to={"/userProFile"}>
                <div className="text-blue-500 hover:underline cursor-pointer">
                  유저 프로필
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
