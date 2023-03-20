export default function SearchInput() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <div className="mb-8 text-3xl font-bold text-white">
        My Cool Search Engine
      </div>
      <div className="flex w-96 items-center">
        <input
          type="text"
          placeholder="Search here"
          className="w-full rounded-l-md bg-gray-800 py-2 px-4 text-white outline-none"
        />
        <button className="rounded-r-md bg-blue-600 py-2 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
