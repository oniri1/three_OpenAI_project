import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md border-b border-blue-500">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-blue-900">
            개발자 가상 면접 사이트
          </h1>
          <nav>
            <ul className="flex space-x-2 md:space-x-4">
              <li>
                <a href="#dashboard" className="text-blue-500 hover:underline">
                  메인 페이지
                </a>
              </li>
              <li>
                <a href="#feedback" className="text-blue-500 hover:underline">
                  피드백
                </a>
              </li>
              <li>
                <a href="#profile" className="text-blue-500 hover:underline">
                  유저 프로필
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <section
          id="dashboard"
          className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            햄스터의 가상 면접 사이트!
          </h2>
          <div className="mt-2 md:mt-4">
            <h3 className="text-md md:text-lg font-medium">
              환영합니다, [유저 이름]
            </h3>
            <p className="text-gray-600">
              무료로 가상 면접을 진행하고 피드백을 받아보세요!
            </p>
          </div>
        </section>

        <section
          id="practice"
          className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            면접 시작!
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <h3 className="text-md md:text-lg font-medium">질문 생성</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a className="text-blue-500 hover:underline">
                    1: 자기소개를 부탁드려요.
                  </a>
                </li>
                <li>
                  <a className="text-blue-500 hover:underline">
                    2: 이 직업을 선택한 이유?
                  </a>
                </li>
                <li>
                  <a className="text-blue-500 hover:underline">
                    3: 겪은 문제와 해결한 방식을 설명해보세요.
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-md md:text-lg font-medium">당신의 대답은?</h3>
              <div className="mt-2 md:mt-4 p-4 border border-gray-300 rounded-lg">
                <textarea
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                  placeholder="어떻게 대답해야 할까?"
                ></textarea>
                <button className="mt-2 md:mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full md:w-auto">
                  답변하기
                </button>
                <button className="mt-2 md:mt-4 md:ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto">
                  답변 기록 확인
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="feedback"
          className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            피드백
          </h2>
          <div className="mt-2 md:mt-4">
            <h3 className="text-md md:text-lg font-medium">
              가장 최근 [유저 이름]에 대한 피드백
            </h3>
            <p className="text-gray-600">
              당신의 대답은 질문에 대해 명확한 답변을 내지 못했습니다.
            </p>
            <div className="mt-2 md:mt-4">
              <h4 className="text-sm md:text-md font-medium text-gray-800">
                긍정적인 답변
              </h4>
              <div className="w-full bg-green-200 rounded-full h-4 md:h-6">
                <div
                  className="bg-green-500 text-white text-center text-xs md:text-xs font-medium h-full rounded-full"
                  style={{ width: "70%" }}
                >
                  70%
                </div>
              </div>
              <h4 className="mt-2 md:mt-4 text-sm md:text-md font-medium text-gray-800">
                부정적인 답변
              </h4>
              <div className="w-full bg-red-200 rounded-full h-4 md:h-6">
                <div
                  className="bg-red-500 text-white text-center text-xs md:text-xs font-medium h-full rounded-full"
                  style={{ width: "30%" }}
                >
                  30%
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="feedbacks"
          className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            질문 사항 [1]
          </h2>
          <div className="mt-2 md:mt-4">
            <h3 className="text-md md:text-lg font-medium">[질문 내용]</h3>
            <h3 className="text-md md:text-lg font-medium">[유저 답변]</h3>
            <p className="text-gray-600">[유저 답변에 대한 피드백]</p>
          </div>
        </section>

        <section
          id="profile"
          className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Profile
          </h2>
          <form className="mt-2 md:mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="hamster"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="hamster.ham.com"
              />
            </div>
            <div>
              <label
                htmlFor="resume"
                className="block text-gray-700 font-medium"
              >
                자신의 자소서를 업로드 해보세요.
              </label>
              <input type="file" id="resume" className="border-none" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto"
            >
              프로필 업데이트
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-white text-gray-700 text-center py-4 border-t border-blue-500">
        <p>&copy; 이 사이트를 만든 사람은 햄스터를 좋아합니다.</p>
      </footer>
    </div>
  );
};

export default App;
