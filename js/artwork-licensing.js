(() => {
  const artworkOptions = {
    survival: {
      title: "Survival",
      image: "assets/thumbnails/artwork/survival.webp",
      personal: "https://buy.stripe.com/6oU14ofiS1yObou80TgIo00",
      standard: "https://buy.stripe.com/bJe4gA3Aadhw0JQdldgIo01",
      extended: "https://buy.stripe.com/bJebJ27Qq4L064a80TgIo02"
    },
    "the-void-of-souls": {
      title: "The Void of Souls",
      image: "assets/thumbnails/artwork/the-void-of-souls.webp",
      personal: "https://buy.stripe.com/3cI6oI5Iib9o50694XgIo03",
      standard: "https://buy.stripe.com/5kQ9AU7Qq3GW78e5SLgIo0a",
      extended: "https://buy.stripe.com/4gMdRaeeOelAcsy1CvgIo0h"
    },
    "the-heart-of-war": {
      title: "The Heart of War",
      image: "assets/thumbnails/artwork/the-heart-of-war.webp",
      personal: "https://buy.stripe.com/8x29AUc6G7Xc78egxpgIo04",
      standard: "https://buy.stripe.com/14AaEY2w61yO78e5SLgIo0b",
      extended: "https://buy.stripe.com/4gMeVegmW91gdwC2GzgIo0i"
    },
    solitude: {
      title: "Solitude",
      image: "assets/thumbnails/artwork/solitude.webp",
      personal: "https://buy.stripe.com/eVq00k9Yy2CScsy2GzgIo05",
      standard: "https://buy.stripe.com/cNi7sM9YygtI0JQdldgIo0c",
      extended: "https://buy.stripe.com/fZu5kE3Aaa5kakq0yrgIo0j"
    },
    "human-spirits": {
      title: "Human Spirits",
      image: "assets/thumbnails/artwork/human-spirits.webp",
      personal: "https://buy.stripe.com/7sYdRa9YygtIakq0yrgIo06",
      standard: "https://buy.stripe.com/6oU9AU3Aacds64a5SLgIo0d",
      extended: "https://buy.stripe.com/7sY3cw7QqfpE9gmgxpgIo0k"
    },
    "guardian-of-dreams": {
      title: "Guardian of Dreams",
      image: "assets/thumbnails/artwork/guardian-of-dreams.webp",
      personal: "https://buy.stripe.com/4gM4gAfiS0uKgIO4OHgIo07",
      standard: "https://buy.stripe.com/4gMcN6b2C0uK64a6WPgIo0e",
      extended: "https://buy.stripe.com/fZubJ2fiS1yOgIOgxpgIo0m"
    },
    "girl-child": {
      title: "Girl Child",
      image: "assets/thumbnails/artwork/girl-child.webp",
      personal: "https://buy.stripe.com/dRm9AU1s20uK64a0yrgIo08",
      standard: "https://buy.stripe.com/bJe00k6Mm7Xc2RY0yrgIo0f",
      extended: "https://buy.stripe.com/8x27sMeeOfpE64a94XgIo0n"
    },
    "cultural-identity": {
      title: "Cultural Identity",
      image: "assets/thumbnails/artwork/cultural-identity.webp",
      personal: "https://buy.stripe.com/9B6cN62w66T83W2ephgIo09",
      standard: "https://buy.stripe.com/aFa8wQ6Mm5P4akq1CvgIo0g",
      extended: "https://buy.stripe.com/9B65kEeeO7Xc2RY94XgIo0o"
    }
  };

  const artworkDescriptions = {
    survival: "Endurance, resilience and the human spirit.",
    "the-void-of-souls": "Collective consciousness, spiritual energy and the infinite.",
    "the-heart-of-war": "Conflict, transformation and inner balance.",
    solitude: "Reflection, stillness and the inner self.",
    "human-spirits": "Shared memory and collective presence.",
    "guardian-of-dreams": "Protection, ambition and becoming.",
    "girl-child": "Patriarchy, resilience and survival.",
    "cultural-identity": "Pattern, belonging and visual memory."
  };

  const requestedArtwork = new URLSearchParams(window.location.search).get("artwork");
  const shopGrid = document.querySelector("[data-artwork-shop-grid]");

  if (shopGrid) {
    shopGrid.innerHTML = Object.entries(artworkOptions).map(([slug, artwork], index) => `
      <article class="artwork-shop-card reveal${index % 3 === 1 ? " delay-1" : index % 3 === 2 ? " delay-2" : ""}${requestedArtwork === slug ? " is-selected" : ""}" id="shop-${slug}">
        <figure class="artwork-shop-media protected-artwork-preview">
          <img src="${artwork.image}" alt="${artwork.title} protected artwork preview" width="720" height="720" loading="lazy" decoding="async">
        </figure>
        <div class="artwork-shop-copy">
          <p class="eyebrow">Digital Artwork · 2026</p>
          <h3>${artwork.title}</h3>
          <p>${artworkDescriptions[slug]}</p>
          <p class="artwork-gallery-meta">2026 - Digital illustration - 30.5 x 30.5 cm (12 x 12 in) - Matte-framed print - Edition and availability: enquire with studio</p>
          <p class="artwork-use-label">Available media</p>
          <ul class="artwork-medium-list" aria-label="Available media for ${artwork.title}">
            <li>Mockups</li>
            <li>Print</li>
            <li>Editorial</li>
            <li>Digital</li>
            <li>Textile</li>
            <li>Fashion</li>
          </ul>
          <p class="artwork-use-note">Textile, fashion, merchandise and products for sale require an Extended licence.</p>
          <dl class="artwork-shop-prices">
            <div><dt>Personal collector file</dt><dd>$65 USD</dd></div>
            <div><dt>Standard commercial licence</dt><dd>$325 USD</dd></div>
          </dl>
          <div class="artwork-shop-actions">
            <a class="btn btn-primary" href="${artwork.personal}" aria-label="Buy the personal collector licence for ${artwork.title}">Collect — $65</a>
            <a class="btn btn-secondary" href="${artwork.standard}" aria-label="Buy the standard commercial licence for ${artwork.title}">License — $325</a>
          </div>
          <a class="artwork-shop-extended" href="${artwork.extended}" aria-label="Buy the extended commercial licence for ${artwork.title}">Extended commercial licence — $1,250</a>
          <a class="text-link" href="exhibition-catalogue.html#${slug}">Read artwork details</a>
        </div>
      </article>
    `).join("");
  }

  const showcase = document.querySelector("[data-artwork-showcase]");

  if (showcase) {
    const viewport = showcase.querySelector("[data-showcase-viewport]");
    const track = showcase.querySelector("[data-showcase-track]");
    const previousButton = showcase.querySelector("[data-showcase-prev]");
    const nextButton = showcase.querySelector("[data-showcase-next]");
    const dotsContainer = showcase.querySelector("[data-showcase-dots]");
    const status = showcase.querySelector("[data-showcase-status]");
    const originalSlides = Array.from(track.querySelectorAll("[data-showcase-slide]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (originalSlides.length > 1) {
      const makeClone = (slide) => {
        const clone = slide.cloneNode(true);
        clone.removeAttribute("data-showcase-slide");
        clone.setAttribute("aria-hidden", "true");
        clone.querySelector("img").alt = "";
        return clone;
      };

      track.prepend(makeClone(originalSlides[originalSlides.length - 1]));
      track.append(makeClone(originalSlides[0]));

      const allSlides = Array.from(track.children);
      const dots = originalSlides.map((slide, index) => {
        const dot = document.createElement("button");
        dot.className = "artwork-showcase-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Show example ${index + 1} of ${originalSlides.length}`);
        dot.addEventListener("click", () => goTo(index + 1, true));
        dotsContainer.append(dot);
        return dot;
      });

      let current = 1;
      let autoTimer = null;
      let pointerId = null;
      let pointerStartX = 0;
      let pointerStartY = 0;

      const realIndex = () => (current - 1 + originalSlides.length) % originalSlides.length;

      const render = (animate = true, announce = false) => {
        if (!animate) track.style.transition = "none";
        track.style.transform = `translate3d(-${current * 100}%,0,0)`;

        const activeIndex = realIndex();
        allSlides.forEach((slide, index) => slide.classList.toggle("is-active", index === current));
        originalSlides.forEach((slide, index) => slide.setAttribute("aria-hidden", index === activeIndex ? "false" : "true"));
        dots.forEach((dot, index) => dot.setAttribute("aria-current", index === activeIndex ? "true" : "false"));

        if (announce) {
          const label = originalSlides[activeIndex].querySelector("figcaption strong")?.textContent || "Artwork use example";
          status.textContent = `Showing example ${activeIndex + 1} of ${originalSlides.length}: ${label}`;
        }

        if (!animate) {
          requestAnimationFrame(() => {
            track.style.transition = "";
          });
        }
      };

      const normalizeReducedMotionIndex = () => {
        if (current === 0) current = originalSlides.length;
        if (current === originalSlides.length + 1) current = 1;
      };

      function goTo(index, announce = false) {
        current = index;
        if (reducedMotion.matches) {
          normalizeReducedMotionIndex();
          render(false, announce);
          return;
        }
        render(true, announce);
      }

      const move = (direction, announce = false) => goTo(current + direction, announce);

      const stopAuto = () => {
        window.clearInterval(autoTimer);
        autoTimer = null;
      };

      const startAuto = () => {
        stopAuto();
        if (reducedMotion.matches || document.hidden) return;
        autoTimer = window.setInterval(() => move(1), 5200);
      };

      const restartAuto = () => {
        stopAuto();
        startAuto();
      };

      previousButton.addEventListener("click", () => {
        move(-1, true);
        restartAuto();
      });
      nextButton.addEventListener("click", () => {
        move(1, true);
        restartAuto();
      });

      viewport.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1, true);
        restartAuto();
      });

      viewport.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        pointerId = event.pointerId;
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
        stopAuto();
        viewport.setPointerCapture?.(event.pointerId);
      });

      viewport.addEventListener("pointerup", (event) => {
        if (event.pointerId !== pointerId) return;
        const distanceX = event.clientX - pointerStartX;
        const distanceY = event.clientY - pointerStartY;
        if (Math.abs(distanceX) > 42 && Math.abs(distanceX) > Math.abs(distanceY) * 1.15) {
          move(distanceX > 0 ? -1 : 1, true);
        }
        pointerId = null;
        restartAuto();
      });

      viewport.addEventListener("pointercancel", () => {
        pointerId = null;
        restartAuto();
      });

      track.addEventListener("transitionend", (event) => {
        if (event.target !== track || event.propertyName !== "transform") return;
        if (current === 0) {
          current = originalSlides.length;
          render(false);
        } else if (current === originalSlides.length + 1) {
          current = 1;
          render(false);
        }
      });

      showcase.addEventListener("pointerenter", stopAuto);
      showcase.addEventListener("pointerleave", startAuto);
      showcase.addEventListener("focusin", stopAuto);
      showcase.addEventListener("focusout", () => {
        window.setTimeout(() => {
          if (!showcase.contains(document.activeElement)) startAuto();
        }, 0);
      });
      document.addEventListener("visibilitychange", () => document.hidden ? stopAuto() : startAuto());
      reducedMotion.addEventListener?.("change", startAuto);

      render(false);
      startAuto();
    }
  }

  const checkout = document.querySelector("[data-artwork-checkout]");
  if (!checkout) return;

  const select = checkout.querySelector("[data-artwork-select]");
  const preview = checkout.querySelector("[data-artwork-preview]");
  const title = checkout.querySelector("[data-artwork-title]");
  const checkoutLinks = document.querySelectorAll("[data-checkout-tier]");
  const licenceNames = {
    personal: "Personal Collector",
    standard: "Standard Commercial",
    extended: "Extended Commercial"
  };

  if (requestedArtwork && artworkOptions[requestedArtwork]) {
    select.value = requestedArtwork;
  }

  const updateCheckout = () => {
    const slug = select.value;
    const artwork = artworkOptions[slug] || artworkOptions.survival;

    preview.src = artwork.image;
    preview.alt = `${artwork.title} protected artwork preview`;
    title.textContent = artwork.title;

    checkoutLinks.forEach((link) => {
      const tier = link.dataset.checkoutTier;
      if (!artwork[tier]) return;
      link.href = artwork[tier];
      link.textContent = `Buy ${licenceNames[tier]} Licence`;
      link.setAttribute("aria-label", `Buy the ${licenceNames[tier]} licence for ${artwork.title} through secure Stripe checkout`);
    });

    const url = new URL(window.location.href);
    url.searchParams.set("artwork", slug);
    window.history.replaceState({}, "", url);
  };

  select.addEventListener("change", updateCheckout);
  updateCheckout();
})();
