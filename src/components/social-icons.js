import React from 'react'

function SocialIcons() {
  return (
    <div>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a
          className="ml-3 text-gray-400"
          href="https://www.instagram.com/mattos.pro/"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a
          className="ml-3 text-gray-400"
          href="https://www.linkedin.com/in/joaovieiramattos/"
        >
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              stroke="none"
              d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
            ></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
        <a
          className="ml-3 text-gray-400"
          href="https://www.youtube.com/@JoaoMattosPro"
        >
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0"
            className="w-5 h-5"
            viewBox="-271 311.2 256 179.8"
          >
            <path
              d="M-59.1,311.2h-167.8c0,0-44.1,0-44.1,44.1v91.5c0,0,0,44.1,44.1,44.1h167.8c0,0,44.1,0,44.1-44.1v-91.5
	C-15,355.3-15,311.2-59.1,311.2z M-177.1,450.3v-98.5l83.8,49.3L-177.1,450.3z"
            />
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  )
}

export default SocialIcons