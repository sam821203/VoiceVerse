<template>
  <label
    for="search-dropdown"
    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >Your Email</label
  >
  <button
    id="dropdown-button"
    data-dropdown-toggle="dropdown"
    class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
    type="button"
  >
    All categories
    <svg
      class="w-2.5 h-2.5 ml-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>
  <div
    id="dropdown"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow-xl w-44 dark:bg-gray-700"
  >
    <ul class="py-2 text-sm text-gray-700 focus:outline-none" aria-labelledby="dropdown-button">
      <li>
        <button
          type="button"
          class="inline-flex w-full px-4 py-2 hover:bg-gray-100 focus:outline-none"
        >
          Mockups
        </button>
      </li>
      <li>
        <button
          type="button"
          class="inline-flex w-full px-4 py-2 hover:bg-gray-100 focus:outline-none"
        >
          Templates
        </button>
      </li>
      <li>
        <button
          type="button"
          class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Design
        </button>
      </li>
      <li>
        <button
          type="button"
          class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Logos
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
