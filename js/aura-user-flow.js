/*
  Aura Manager user-flow component.
  Replace image paths below when new UI mockups are exported.
*/
const auraUserFlowSteps = [
  {
    number: "01",
    title: "Landing Page",
    image: "assets/images/aura/user-flow/landing-page.webp",
    description: "Introduces Aura Manager and encourages users to begin creating.",
    goal: "Explore the platform and start a conversation with Aura."
  },
  {
    number: "02",
    title: "Authentication",
    image: "assets/images/aura/user-flow/authentication.webp",
    description: "Secure sign-in using Google or Magic Link authentication.",
    goal: "Access Aura Manager quickly without using passwords."
  },
  {
    number: "03",
    title: "Loading State",
    image: "assets/images/aura/user-flow/loading-state.webp",
    description: "A brief transition state while the application prepares the workspace.",
    goal: "Wait while Aura Manager initializes."
  },
  {
    number: "04",
    title: "Empty Workspace",
    image: "assets/images/aura/user-flow/empty-workspace.webp",
    description: "A first-time workspace before any conversation begins.",
    goal: "Enter a prompt or choose a suggested creative task."
  },
  {
    number: "05",
    title: "AI Processing",
    image: "assets/images/aura/user-flow/ai-processing.webp",
    description: "Aura analyses the user request and generates a response.",
    goal: "Receive clear feedback while content is being created."
  },
  {
    number: "06",
    title: "Response Workspace",
    image: "assets/images/aura/user-flow/response-workspace.webp",
    description: "Displays generated content and supports continued collaboration.",
    goal: "Review, refine, save, copy, or continue the conversation."
  }
];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function UserFlowCard(step) {
  return `
    <article class="user-flow-card">
      <div class="user-flow-media">
        <img src="${escapeHTML(step.image)}" alt="${escapeHTML(step.title)} screen from Aura Manager" width="540" height="960" loading="lazy" decoding="async">
      </div>
      <div class="user-flow-meta">
        <span class="user-flow-step">${escapeHTML(step.number)}</span>
        <span class="user-flow-label">Screen</span>
      </div>
      <h3>${escapeHTML(step.title)}</h3>
      <p>${escapeHTML(step.description)}</p>
      <p class="user-flow-goal"><strong>User goal</strong>${escapeHTML(step.goal)}</p>
    </article>
  `;
}

function UserFlowSection(container) {
  container.innerHTML = auraUserFlowSteps.map(UserFlowCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const userFlowContainer = document.querySelector("[data-user-flow-grid]");

  if (userFlowContainer) {
    UserFlowSection(userFlowContainer);
  }
});
