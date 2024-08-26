import "./App.css";
import { Header } from "./Comps/header";
import { Footer } from "./Comps/footer";
import { Route, Routes } from "react-router-dom";
import { FeedBack, UserProFile, Interview } from "./Comps/main";
import { MainPage } from "./Comps/main/mainpage";

const App = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header></Header>

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/interview" element={<Interview />}></Route>
          <Route path="/feedBack" element={<FeedBack />}></Route>
          <Route path="/userProFile" element={<UserProFile />}></Route>
        </Routes>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default App;
