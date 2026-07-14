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

  const requestedArtwork = new URLSearchParams(window.location.search).get("artwork");
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
