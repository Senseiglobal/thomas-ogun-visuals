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

  const configurePrimaryNavigation = () => {
    if (!navMenu) return;

    const currentFile = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const workPages = new Set([
      "portfolio.html",
      "album-campaign-direction.html",
      "creative-direction.html",
      "editorial-design-gallery.html",
      "traditional-pencil-art.html",
      "cinematography.html"
    ]);
    const exhibitionPages = new Set(["exhibition.html", "exhibition-catalogue.html"]);
    const explorePages = new Set(["auramanager.html", "professional-practice.html", "press.html", "artwork-licensing.html", "service-inquiry.html"]);
    const currentAttribute = isCurrent => isCurrent ? ' aria-current="page"' : "";

    navMenu.innerHTML = `
      <li><a href="index.html"${currentAttribute(currentFile === "index.html")}>Home</a></li>
      <li><a href="about.html"${currentAttribute(currentFile === "about.html")}>About</a></li>
      <li><a href="portfolio.html"${workPages.has(currentFile) ? ' class="is-section-current"' : ""}${currentAttribute(currentFile === "portfolio.html")}>Work</a></li>
      <li><a href="exhibition.html"${exhibitionPages.has(currentFile) ? ' class="is-section-current"' : ""}${currentAttribute(currentFile === "exhibition.html")}>Exhibition</a></li>
      <li class="nav-more-item">
        <details class="nav-dropdown">
          <summary${explorePages.has(currentFile) ? ' class="is-section-current"' : ""}>Explore</summary>
          <ul class="nav-dropdown-menu">
            <li><a href="auramanager.html"${currentAttribute(currentFile === "auramanager.html")}>Aura Manager</a></li>
            <li><a href="service-inquiry.html"${currentAttribute(currentFile === "service-inquiry.html")}>Services &amp; Inquiry</a></li>
            <li><a href="professional-practice.html"${currentAttribute(currentFile === "professional-practice.html")}>Professional Practice</a></li>
            <li><a href="press.html"${currentAttribute(currentFile === "press.html")}>Press &amp; Curators</a></li>
            <li><a href="artwork-licensing.html"${currentAttribute(currentFile === "artwork-licensing.html")}>Pricing &amp; Permissions</a></li>
          </ul>
        </details>
      </li>
      <li><a href="contact.html"${currentAttribute(currentFile === "contact.html")}>Contact</a></li>
    `;

    document.addEventListener("click", event => {
      document.querySelectorAll(".nav-dropdown[open]").forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
          dropdown.removeAttribute("open");
        }
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        document.querySelectorAll(".nav-dropdown[open]").forEach(dropdown => dropdown.removeAttribute("open"));
      }
    });
  };

  const addStudioLinksToFooters = () => {
    document.querySelectorAll(".site-footer").forEach(footer => {
      const navigateHeading = Array.from(footer.querySelectorAll("h2")).find(heading => heading.textContent.trim() === "Navigate");
      const list = navigateHeading?.nextElementSibling;
      if (!list) return;

      const licensingItem = list.querySelector('a[href="artwork-licensing.html"]')?.closest("li");
      const contactItem = list.querySelector('a[href="contact.html"]')?.closest("li");

      if (!list.querySelector('a[href="press.html"]')) {
        const pressItem = document.createElement("li");
        pressItem.innerHTML = '<a href="press.html">Press &amp; Curators</a>';
        list.insertBefore(pressItem, licensingItem || contactItem || null);
      }

      if (!list.querySelector('a[href="service-inquiry.html"]')) {
        const servicesItem = document.createElement("li");
        servicesItem.innerHTML = '<a href="service-inquiry.html">Services &amp; Inquiry</a>';
        list.insertBefore(servicesItem, contactItem || null);
      }
    });
  };

  configurePrimaryNavigation();
  addStudioLinksToFooters();

  const getStoredTheme = () => {
    try {
      return localStorage.getItem(themeStorageKey) || "dark";
    } catch (error) {
      return "dark";
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
      title: "Artwork Licensing",
      url: "artwork-licensing.html",
      text: "USD licensing options, permitted uses, high-resolution delivery and artwork usage restrictions."
    },
    {
      title: "Aura Manager",
      url: "auramanager.html",
      text: "AI-powered creative thinking platform that turns rough ideas into documents, prompts, plans and production-ready content."
    },
    {
      title: "Cinematography",
      url: "album-campaign-direction.html",
      text: "Camera-led music film and campaign work connecting Nigeria and South Africa."
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
      title: "Press & Curatorial Information",
      url: "press.html",
      text: "Critic and curator overview, selected projects, artist CV, exhibition catalogue, credits and review enquiries."
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
    },
    {
      title: "Services & Project Inquiry",
      url: "service-inquiry.html",
      text: "Creative services, indicative project ranges and the studio project brief."
    }
  ];

  const conciergeReplies = [
    {
      keys: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      reply: "Hello. I am the automated studio concierge. I can help you explore Thomas Ogun's work, understand services and licensing, or find the right enquiry route.",
      url: "portfolio.html",
      cta: "Explore Selected Work"
    },
    {
      keys: ["exhibition", "identity", "spirituality", "installation", "augmented reality", "ar work"],
      reply: "Identity & Spirituality is the best starting point. It brings together the physical artworks, AR experiences, catalogue, installation records and the ideas behind the exhibition.",
      url: "exhibition.html",
      cta: "Open Exhibition"
    },
    {
      keys: ["aura", "manager", "tool", "platform", "asset", "lyrics", "script"],
      reply: "Aura Manager is Thomas Ogun's creative technology case study. It shows how an early idea became a practical AI-assisted platform for planning, writing and production-ready creative output.",
      url: "auramanager.html",
      cta: "Open Aura Manager"
    },
    {
      keys: ["video", "film", "cinema", "cinematography", "music"],
      reply: "The Album Campaign Direction case study shows the strongest moving-image work, including creative leadership, cinematography, editing and cross-country production.",
      url: "album-campaign-direction.html",
      cta: "View Film Case Study"
    },
    {
      keys: ["critic", "curator", "press", "review", "interview", "cv"],
      reply: "The Press and Curatorial Information page presents the artist overview, selected projects, verified credits, CV, catalogue and direct review contacts in one concise route.",
      url: "press.html",
      cta: "Open Press Page"
    },
    {
      keys: ["archive", "documentation", "publication", "research"],
      reply: "Professional Practice collects exhibition documentation, process notes, publications and technical research.",
      url: "professional-practice.html",
      cta: "Open Practice"
    },
    {
      keys: ["consultation", "calendly", "schedule", "session", "strategy call"],
      reply: "The Creative Strategy Consultation is a confirmed 60-minute session. Submit the short brief, complete the secure Stripe payment, and Stripe will take you to Calendly to choose your time.",
      url: "service-inquiry.html#focused-session",
      cta: "View 60-Minute Consultation"
    },
    {
      keys: ["license", "licence", "licensing", "permission", "buy art", "purchase artwork", "download", "commercial use", "personal use"],
      reply: "Artwork purchases use clear written permissions. Personal, publishing and commercial licences are separated so you can choose the rights that match your intended use before secure Stripe checkout.",
      url: "artwork-licensing.html",
      cta: "View Pricing & Permissions"
    },
    {
      keys: ["pencil", "graphite", "traditional art", "sketch", "drawing"],
      reply: "The Traditional Pencil Art gallery presents graphite studies rooted in observation, spirituality and identity. It is a useful view of the handmade foundation behind the wider digital practice.",
      url: "traditional-pencil-art.html",
      cta: "Open Pencil Art Gallery"
    },
    {
      keys: ["editorial", "illustration", "album art", "cover design", "brand design"],
      reply: "The editorial gallery brings together illustration, campaign systems, album artwork and brand-focused design. It shows how one visual idea is adapted across formats without losing its character.",
      url: "editorial-design-gallery.html",
      cta: "Open Editorial Gallery"
    },
    {
      keys: ["turnaround", "deadline", "rush", "weekend", "deposit", "process", "how it works"],
      reply: "Standard projects usually take 5 to 10 business days. The studio reviews briefs within 24 to 48 hours, and approved work is secured with a signed agreement and 50% deposit. Rush or weekend delivery carries a 25% premium.",
      url: "service-inquiry.html#project-brief",
      cta: "Review the Project Process"
    },
    {
      keys: ["price", "pricing", "budget", "quote", "cost", "service", "project", "commission", "hire", "collaborate", "book"],
      reply: "The Services & Inquiry page shows indicative USD ranges for film, creative direction, illustration, content systems, AR prototypes and the 60-minute strategy consultation. A short brief helps the studio recommend the right scope.",
      url: "service-inquiry.html",
      cta: "Start Project Inquiry"
    },
    {
      keys: ["contact", "email", "phone", "whatsapp", "location"],
      reply: "You can reach the studio through the contact page. Project briefs are best submitted through Services & Inquiry so the team receives your goals, budget and timing together.",
      url: "contact.html",
      cta: "Contact the Studio"
    },
    {
      keys: ["thank", "thanks", "helpful", "great"],
      reply: "You are welcome. Ask another question whenever you are ready, or use the portfolio to continue exploring the work.",
      url: "portfolio.html",
      cta: "Continue to Portfolio"
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
      <a class="header-cta" href="service-inquiry.html"><span>Work With Me</span></a>
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
          <div class="assistant-message assistant-message-bot">Hello. I am the automated studio concierge. Tell me what you are looking for and I will guide you to the most useful work, service or booking route.</div>
        </div>
        <div class="quick-prompts" aria-label="Suggested questions">
          <button type="button" data-prompt="Show me the exhibition">Exhibition</button>
          <button type="button" data-prompt="What services are available?">Services</button>
          <button type="button" data-prompt="How do I book the 60-minute consultation?">Book a Consultation</button>
          <button type="button" data-prompt="How does artwork licensing work?">Artwork Licensing</button>
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

    let conciergeReplyCount = 0;
    let lastConciergeTopic = null;

    const answerConcierge = prompt => {
      const cleanPrompt = prompt.trim();
      if (!cleanPrompt) return;

      addAssistantMessage(cleanPrompt, "user");
      const lowerPrompt = cleanPrompt.toLowerCase();
      const rankedMatches = conciergeReplies
        .map(item => ({
          item,
          score: item.keys.reduce((total, key) => total + (lowerPrompt.includes(key) ? key.length : 0), 0)
        }))
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score);
      const match = rankedMatches[0]?.item || null;
      const conversationalLead = conciergeReplyCount === 0
        ? "Certainly. "
        : conciergeReplyCount % 2 === 0
          ? "Here is the clearest route. "
          : "Of course. ";

      if (match) {
        const repeatedTopic = lastConciergeTopic === match.cta;
        const responseLead = repeatedTopic ? "To recap, " : conversationalLead;
        addAssistantMessage(`${responseLead}${match.reply}`, "bot", { url: match.url, cta: match.cta });
        lastConciergeTopic = match.cta;
      } else {
        addAssistantMessage(
          "I may not have matched that exactly yet. The Portfolio is the best general starting point. If you are a critic or curator, the Press page provides the concise overview, credits, CV and catalogue.",
          "bot",
          { url: "portfolio.html", cta: "Open Portfolio" }
        );
        lastConciergeTopic = "Open Portfolio";
      }
      conciergeReplyCount += 1;
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

  /* Submit general contact enquiries without sending visitors away from the site. */
  const generalContactForm = document.querySelector("[data-general-contact]");
  if (generalContactForm) {
    const submitButton = generalContactForm.querySelector('button[type="submit"]');
    const statusMessage = generalContactForm.querySelector("[data-contact-status]");
    const defaultButtonLabel = submitButton?.textContent || "Send Enquiry";

    generalContactForm.addEventListener("submit", async event => {
      event.preventDefault();

      if (!generalContactForm.checkValidity()) {
        generalContactForm.reportValidity();
        return;
      }

      const formData = new FormData(generalContactForm);
      if (formData.get("_honey")) return;

      if (statusMessage) {
        statusMessage.textContent = "Sending your enquiry...";
        statusMessage.classList.remove("is-error", "is-success");
        statusMessage.classList.add("is-sending");
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
            name: formData.get("name"),
            email: formData.get("email"),
            project_type: formData.get("project"),
            message: formData.get("message"),
            _subject: `General Enquiry | ${formData.get("project")} | ${formData.get("name")}`,
            _template: "table",
            _captcha: "false",
            _url: "https://thomasogunvisuals.com/contact.html",
            _autoresponse: "Thank you for contacting Thomas Ogun Visuals. Your message has been received. We review enquiries Monday to Friday and will reply within 24 to 48 hours. For a detailed commission, you can also complete the Project Inquiry and Creative Brief on our website."
          })
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success === false) {
          throw new Error(result.message || "The enquiry could not be sent.");
        }

        generalContactForm.reset();
        if (statusMessage) {
          statusMessage.textContent = "Thank you. Your enquiry has been sent successfully. We will reply within 24 to 48 hours.";
          statusMessage.classList.remove("is-sending", "is-error");
          statusMessage.classList.add("is-success");
        }
        if (submitButton) submitButton.textContent = "Message Sent";
      } catch (error) {
        if (statusMessage) {
          statusMessage.textContent = "We could not send your enquiry. Please try again or email bookings@thomasogunvisuals.com.";
          statusMessage.classList.remove("is-sending", "is-success");
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

  /* Protect public artwork previews from casual saving and clarify licensing. */
  const protectedArtworkSelector = [
    ".artwork-image",
    ".catalogue-cover-art .catalogue-image-placeholder",
    ".catalogue-card-image",
    ".catalogue-detail-image",
    ".masonry-item .portfolio-art-link"
  ].join(",");

  const protectArtworkPreviews = root => {
    const candidates = [];
    if (root instanceof Element && root.matches(protectedArtworkSelector)) candidates.push(root);
    if (root.querySelectorAll) candidates.push(...root.querySelectorAll(protectedArtworkSelector));

    candidates.forEach(container => {
      if (container.dataset.artProtection === "off") return;

      const images = container.querySelectorAll("img");
      if (!images.length) return;

      container.classList.add("protected-artwork-preview");
      container.setAttribute("data-art-protected", "true");
      container.setAttribute("title", "Protected artwork preview. Clean high-resolution files require a licence.");
      images.forEach(image => {
        image.draggable = false;
        image.setAttribute("data-art-preview", "true");
      });
    });
  };

  let protectionToastTimer;
  const showProtectionNotice = () => {
    let toast = document.querySelector("[data-art-protection-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "artwork-protection-toast";
      toast.setAttribute("data-art-protection-toast", "");
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = "Protected preview. Purchase a licence for the clean high-resolution artwork file.";
    toast.classList.add("is-visible");
    window.clearTimeout(protectionToastTimer);
    protectionToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
  };

  protectArtworkPreviews(document);
  if ("MutationObserver" in window) {
    const artworkObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof Element) protectArtworkPreviews(node);
        });
      });
    });
    artworkObserver.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener("contextmenu", event => {
    if (!event.target.closest?.("[data-art-protected]")) return;
    event.preventDefault();
    showProtectionNotice();
  });

  document.addEventListener("dragstart", event => {
    if (!event.target.closest?.("[data-art-protected]")) return;
    event.preventDefault();
    showProtectionNotice();
  });

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
      document.body.classList.remove("nav-open");
      navMenu.querySelectorAll(".nav-dropdown[open]").forEach(dropdown => dropdown.removeAttribute("open"));
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
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
