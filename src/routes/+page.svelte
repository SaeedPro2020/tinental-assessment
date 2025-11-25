<h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome</h1>

<p class="text-gray-700 text-lg leading-relaxed">
  This application is a lightweight school registry system built as a coding assessment. 
  It provides a clean and efficient interface for managing <strong>students</strong> and 
  <strong>teachers</strong>, using a modern stack powered by <strong>SvelteKit</strong>,
  <strong>TypeScript</strong>, and <strong>shadcn-svelte</strong> UI components.
</p>

<h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-2">📌 Features</h2>

<ul class="list-disc list-inside text-gray-700 space-y-2">
  <li>Interactive Student and Teacher tables</li>
  <li>Live updates when adding new records (client-side reactivity)</li>
  <li>Search, sorting, pagination built on TanStack Table</li>
  <li>Reusable form and table components</li>
  <li>Structured architecture with clear separation of concerns</li>
</ul>

<h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-2">🛠️ Tools & Technologies Used</h2>

<ul class="list-disc list-inside text-gray-700 space-y-2">
  <li><strong>SvelteKit</strong> — routing, server functions, reactive UI</li>
  <li><strong>TypeScript</strong> — strict typing across the entire app</li>
  <li><strong>shadcn-svelte</strong> — UI components (buttons, inputs, cards, menus)</li>
  <li><strong>TanStack Table</strong> — sorting, filtering, pagination logic</li>
  <li><strong>TailwindCSS</strong> — styling and layout utilities</li>
  <li><strong>Svelte Runes</strong> — modern reactivity model for props and state</li>
</ul>

<h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-2">💡 Application Architecture</h2>

<ul class="list-disc list-inside text-gray-700 space-y-2">
  <li><strong>Services</strong> manage all data operations (in-memory for this assignment)</li>
  <li><strong>Routes</strong> provide data loading and page state</li>
  <li><strong>Components</strong> (forms, tables) are reusable and isolated</li>
  <li><strong>DataTable</strong> component is shared between Students and Teachers</li>
</ul>

<p class="text-gray-700 text-lg mt-6 leading-relaxed">
  To view or manage records, simply use the navigation items located in the 
  <strong>top-right corner</strong> of the page. There you’ll find links to the 
  <em>Students</em> and <em>Teachers</em> sections.
</p>
