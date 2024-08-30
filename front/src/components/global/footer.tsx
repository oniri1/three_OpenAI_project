export const Footer = (): JSX.Element => {
  return (
    <footer className="bg-white text-gray-700 text-center py-4 border-t border-blue-500 flex flex-wrap justify-center">
      <p>&copy; oniri1의 취업용 프로젝트 입니다.</p>

      <div className="flex justify-center h-[30px] w-[100%]">
        <a
          href="https://oniri1.tistory.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-800 text-white p-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <img
            src="/tistory-logo.png"
            alt="Naver Blog"
            className="w-6 h-6 mr-2"
          />
          Tistory
        </a>
        <a
          href="https://github.com/oniri1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-blue-500 text-white p-4 rounded-md shadow-lg hover:bg-gray-700 transition duration-300"
        >
          <img
            src="/github-logo.png"
            alt="GitHub Blog"
            className="w-6 h-6 mr-2"
          />
          GitHub
        </a>
      </div>
    </footer>
  );
};
