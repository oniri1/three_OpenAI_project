export const UserProFile = (): JSX.Element => {
  return (
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
          <label htmlFor="email" className="block text-gray-700 font-medium">
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
          <label htmlFor="resume" className="block text-gray-700 font-medium">
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
  );
};
