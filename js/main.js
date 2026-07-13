/* ==========================================================================
   Thomas Ogun Visual - Main JavaScript
   Handles navigation, sticky header state, reveal animations and filters.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const nav = document.querySelector(".nav");
  const themeStorageKey = "thomasOgunVisualsTheme";

  const getStoredTheme = () => {
    try {
      return localStorage.getItem(themeStorageKey) || "light";
    } catch (error) {
      return "light";
    }
  };

  const applyTheme = theme => {
    const cleanTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", cleanTheme);
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      const isDark = cleanTheme === "dark";
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      button.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
    });
  };

  applyTheme(getStoredTheme());

  const siteSearchItems = [
    {
      title: "Portfolio",
      url: "portfolio.html",
      text: "Visual art, AR installations, cinematography, creative direction and portraits."
    },
    {
      title: "Identity & Spirituality",
      url: "exhibition.html",
      text: "Exhibition overview, physical artworks, AR experiences, catalogue and process documentation."
    },
    {
      title: "Identity and Spirituality Catalogue",
      url: "exhibition-catalogue.html",
      text: "Museum-style catalogue with chapters, artwork entries, AR documentation, curatorial essay and checklist."
    },
    {
      title: "Aura Manager",
      url: "auramanager.html",
      text: "AI-powered creative thinking platform that turns rough ideas into documents, prompts, plans and production-ready content."
    },
    {
      title: "Cinematography",
      url: "cinematography.html",
      text: "Moving-image work for music, documentary, performance, commercial visuals and art films."
    },
    {
      title: "Creative Direction",
      url: "creative-direction.html",
      text: "Campaigns, album artwork, brand identity, music projects and visual strategy."
    },
    {
      title: "Professional Practice",
      url: "professional-practice.html",
      text: "Archive, publications, press, collaborations, technical research and documentation."
    },
    {
      title: "About",
      url: "about.html",
      text: "Biography, mission, vision, creative philosophy, timeline and studio practice."
    },
    {
      title: "Contact",
      url: "contact.html",
      text: "Email, phone, location, social links and collaboration enquiries."
    }
  ];

  const conciergeReplies = [
    {
      keys: ["exhibition", "identity", "spirituality", "artwork", "ar"],
      reply: "Start with Identity & Spirituality. It shows the exhibition concept, artworks, AR process, catalogue area and installation documentation.",
      url: "exhibition.html",
      cta: "Open Exhibition"
    },
    {
      keys: ["aura", "manager", "tool", "platform", "asset", "lyrics", "script"],
      reply: "Aura Manager is the AI-powered creative thinking platform. It shows how rough ideas become documents, prompts, strategies, diagrams and production-ready creative outputs.",
      url: "auramanager.html",
      cta: "Open Aura Manager"
    },
    {
      keys: ["video", "film", "cinema", "cinematography", "music"],
      reply: "The Cinematography page is best for moving-image work, music videos, documentary pieces, performance films and visual treatments.",
      url: "cinematography.html",
      cta: "Open Cinematography"
    },
    {
      keys: ["press", "cv", "archive", "documentation", "publication", "research"],
      reply: "Professional Practice collects the archive: exhibition documentation, process notes, publications, press, CV download areas and technical research.",
      url: "professional-practice.html",
      cta: "Open Practice"
    },
    {
      keys: ["contact", "email", "collaborate", "book", "commission", "hire"],
      reply: "For collaborations, commissions, screenings or creative direction enquiries, the Contact page is the quickest route.",
      url: "contact.html",
      cta: "Open Contact"
    }
  ];

  const iconSearch = `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <circle cx="11" cy="11" r="7"></circle>
      <path d="m20 20-3.5-3.5"></path>
    </svg>`;

  const iconSpark = `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"></path>
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"></path>
    </svg>`;

  const iconTheme = `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <circle class="theme-icon-sun" cx="12" cy="12" r="4"></circle>
      <path class="theme-icon-sun" d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
      <path class="theme-icon-moon" d="M20 14.6A7.8 7.8 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6z"></path>
    </svg>`;

  /* Site-wide search and assistant shell. Replace the local replies with an AI API later. */
  const createConciergeTools = () => {
    if (!nav || document.querySelector("[data-search-toggle]")) return;

    const navActions = document.createElement("div");
    navActions.className = "nav-actions";
    navActions.innerHTML = `
      <button class="icon-button" type="button" aria-label="Search site" data-search-toggle>${iconSearch}</button>
      <button class="icon-button theme-toggle" type="button" aria-label="Switch to dark theme" aria-pressed="false" data-theme-toggle>${iconTheme}</button>
      <a class="header-cta" href="https://docs.google.com/forms/d/e/1FAIpQLSeNMaJDExYKdK6wUML1uPVgHx3UqegIwOjhvAjnOCnCJ7kHqw/viewform" target="_blank" rel="noopener"><span>Work With Me</span></a>
    `;
    nav.appendChild(navActions);
    applyTheme(document.documentElement.getAttribute("data-theme") || getStoredTheme());

    navActions.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.addEventListener("click", () => {
        const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        try {
          localStorage.setItem(themeStorageKey, nextTheme);
        } catch (error) {
          /* Theme still changes for the current visit if localStorage is unavailable. */
        }
      });
    });

    const searchDialog = document.createElement("section");
    searchDialog.className = "search-panel";
    searchDialog.setAttribute("aria-label", "Site search");
    searchDialog.setAttribute("aria-hidden", "true");
    searchDialog.setAttribute("data-search-panel", "");
    searchDialog.innerHTML = `
      <div class="tool-backdrop" data-search-close></div>
      <div class="search-card" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <button class="tool-close" type="button" aria-label="Close search" data-search-close>&times;</button>
        <p class="eyebrow">Search</p>
        <h2 id="search-title">Find a page or project</h2>
        <label class="sr-only" for="site-search-input">Search the portfolio</label>
        <input id="site-search-input" type="search" placeholder="Try Aura Manager, exhibition, AR, cinematography..." data-search-input>
        <div class="search-results" data-search-results></div>
      </div>
    `;
    document.body.appendChild(searchDialog);

    const conciergePanel = document.createElement("section");
    conciergePanel.className = "concierge-panel";
    conciergePanel.setAttribute("aria-label", "Ask Concierge assistant");
    conciergePanel.setAttribute("aria-hidden", "true");
    conciergePanel.setAttribute("data-concierge-panel", "");
    conciergePanel.innerHTML = `
      <div class="tool-backdrop" data-concierge-close></div>
      <div class="concierge-card" role="dialog" aria-modal="true" aria-labelledby="concierge-title">
        <button class="tool-close" type="button" aria-label="Close concierge" data-concierge-close>&times;</button>
        <div class="concierge-header">
          <span class="assistant-mark">${iconSpark}</span>
          <div>
            <p class="eyebrow">Studio Concierge</p>
            <h2 id="concierge-title">Ask about the work</h2>
          </div>
        </div>
        <div class="assistant-thread" data-assistant-thread>
          <div class="assistant-message assistant-message-bot">I can guide you to exhibitions, AR work, Aura Manager, cinematography, creative direction or contact details.</div>
        </div>
        <div class="quick-prompts" aria-label="Suggested questions">
          <button type="button" data-prompt="Show me the exhibition">Exhibition</button>
          <button type="button" data-prompt="What is Aura Manager?">Aura Manager</button>
          <button type="button" data-prompt="Where is the archive?">Archive</button>
        </div>
        <form class="assistant-form" data-assistant-form>
          <label class="sr-only" for="assistant-input">Ask the concierge</label>
          <input id="assistant-input" type="text" placeholder="Ask about Thomas Ogun Visuals..." data-assistant-input>
          <button class="btn btn-primary" type="submit">Ask</button>
        </form>
      </div>
    `;
    document.body.appendChild(conciergePanel);

    const floatingButton = document.createElement("button");
    floatingButton.className = "floating-concierge";
    floatingButton.type = "button";
    floatingButton.setAttribute("data-concierge-open", "");
    floatingButton.innerHTML = `${iconSpark}<span>Ask Concierge</span>`;
    document.body.appendChild(floatingButton);

    const searchInput = searchDialog.querySelector("[data-search-input]");
    const searchResults = searchDialog.querySelector("[data-search-results]");
    const assistantThread = conciergePanel.querySelector("[data-assistant-thread]");
    const assistantInput = conciergePanel.querySelector("[data-assistant-input]");
    const assistantForm = conciergePanel.querySelector("[data-assistant-form]");

    const setPanelState = (panel, isOpen) => {
      panel.classList.toggle("open", isOpen);
      panel.setAttribute("aria-hidden", String(!isOpen));
      document.body.classList.toggle("tool-open", Boolean(document.querySelector(".search-panel.open, .concierge-panel.open")));
    };

    const renderSearchResults = query => {
      const cleanQuery = query.trim().toLowerCase();
      const results = cleanQuery
        ? siteSearchItems.filter(item => `${item.title} ${item.text}`.toLowerCase().includes(cleanQuery))
        : siteSearchItems.slice(0, 4);

      searchResults.innerHTML = results.length
        ? results.map(item => `
            <a href="${item.url}">
              <strong>${item.title}</strong>
              <span>${item.text}</span>
            </a>
          `).join("")
        : `<p>No exact result yet. Try exhibition, Aura Manager, AR, cinema or contact.</p>`;
    };

    const addAssistantMessage = (text, type = "bot", action) => {
      const message = document.createElement("div");
      message.className = `assistant-message assistant-message-${type}`;
      message.textContent = text;
      if (action) {
        const link = document.createElement("a");
        link.className = "assistant-link";
        link.href = action.url;
        link.textContent = action.cta;
        message.appendChild(link);
      }
      assistantThread.appendChild(message);
      assistantThread.scrollTop = assistantThread.scrollHeight;
    };

    const answerConcierge = prompt => {
      const cleanPrompt = prompt.trim();
      if (!cleanPrompt) return;

      addAssistantMessage(cleanPrompt, "user");
      const lowerPrompt = cleanPrompt.toLowerCase();
      const match = conciergeReplies.find(item => item.keys.some(key => lowerPrompt.includes(key)));

      if (match) {
        addAssistantMessage(match.reply, "bot", { url: match.url, cta: match.cta });
      } else {
        addAssistantMessage(
          "A good starting point is the Portfolio page. From there you can move into the exhibition, Aura Manager, cinematography, creative direction or the professional archive.",
          "bot",
          { url: "portfolio.html", cta: "Open Portfolio" }
        );
      }
    };

    renderSearchResults("");

    document.querySelectorAll("[data-search-toggle]").forEach(button => {
      button.addEventListener("click", () => {
        setPanelState(searchDialog, true);
        setPanelState(conciergePanel, false);
        searchInput.focus();
      });
    });

    document.querySelectorAll("[data-concierge-open]").forEach(button => {
      button.addEventListener("click", () => {
        setPanelState(conciergePanel, true);
        setPanelState(searchDialog, false);
        assistantInput.focus();
      });
    });

    document.querySelectorAll("[data-search-close]").forEach(button => {
      button.addEventListener("click", () => setPanelState(searchDialog, false));
    });

    document.querySelectorAll("[data-concierge-close]").forEach(button => {
      button.addEventListener("click", () => setPanelState(conciergePanel, false));
    });

    searchInput.addEventListener("input", event => renderSearchResults(event.target.value));

    conciergePanel.querySelectorAll("[data-prompt]").forEach(button => {
      button.addEventListener("click", () => answerConcierge(button.dataset.prompt));
    });

    assistantForm.addEventListener("submit", event => {
      event.preventDefault();
      answerConcierge(assistantInput.value);
      assistantInput.value = "";
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        setPanelState(searchDialog, false);
        setPanelState(conciergePanel, false);
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPanelState(searchDialog, true);
        setPanelState(conciergePanel, false);
        searchInput.focus();
      }
    });
  };

  createConciergeTools();

  /* Submit exhibition registrations without leaving the page. */
  const exhibitionRegisterForm = document.querySelector("[data-exhibition-register]");
  if (exhibitionRegisterForm) {
    const emailInput = exhibitionRegisterForm.querySelector('input[type="email"]');
    const submitButton = exhibitionRegisterForm.querySelector('button[type="submit"]');
    const statusMessage = exhibitionRegisterForm.querySelector("[data-register-status]");
    const defaultButtonLabel = submitButton?.textContent || "Register Interest";

    exhibitionRegisterForm.addEventListener("submit", async event => {
      event.preventDefault();

      if (!emailInput || !emailInput.checkValidity()) {
        emailInput?.reportValidity();
        return;
      }

      if (statusMessage) {
        statusMessage.textContent = "Sending your registration...";
        statusMessage.classList.add("is-active");
        statusMessage.classList.remove("is-success", "is-error");
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      try {
        const response = await fetch("https://formsubmit.co/ajax/bookings@thomasogunvisuals.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            email: emailInput.value.trim(),
            message: "Please add this visitor to the list for future exhibitions, previews and catalogue releases.",
            _subject: "Future Exhibition Updates Registration",
            _url: "https://thomasogunvisuals.com/exhibition.html",
            _captcha: "false",
            _honey: exhibitionRegisterForm.querySelector('[name="_honey"]')?.value || ""
          })
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success === false) {
          throw new Error(result.message || "Registration could not be sent.");
        }

        exhibitionRegisterForm.reset();
        if (statusMessage) {
          statusMessage.textContent = "Thank you. Your registration has been sent successfully. Please check your inbox for future exhibition updates.";
          statusMessage.classList.remove("is-active", "is-error");
          statusMessage.classList.add("is-success");
        }
        if (submitButton) submitButton.textContent = "Registered";
      } catch (error) {
        if (statusMessage) {
          statusMessage.textContent = "We could not send your registration. Please try again or email bookings@thomasogunvisuals.com.";
          statusMessage.classList.remove("is-active", "is-success");
          statusMessage.classList.add("is-error");
        }
        if (submitButton) submitButton.textContent = "Try Again";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          if (submitButton.textContent === "Sending...") submitButton.textContent = defaultButtonLabel;
        }
      }
    });
  }

  /* Sticky header background after scroll. */
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Mobile navigation toggle with accessible expanded state. */
  if (navToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  /* Fade-in sections as they enter the viewport. */
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  /* Portfolio category filtering. Add categories through data-category values. */
  const filterButtons = document.querySelectorAll("[data-filter]");
  const portfolioItems = document.querySelectorAll("[data-category]");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      portfolioItems.forEach(item => {
        const categories = item.dataset.category.split(" ");
        const shouldShow = filter === "all" || categories.includes(filter);
        item.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
});
