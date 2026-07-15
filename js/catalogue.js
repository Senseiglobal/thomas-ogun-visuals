/* ==========================================================================
   Identity and Spirituality Catalogue
   Update the catalogueArtworks array to refine entries, image paths and media.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("[data-catalogue-app]");
  if (!app) return;

  const physicalPresentation = "12 x 12 inches, matte frame";
  const digitalPaintingSpecs = "6000 x 6000 pixels, 300 dpi, 24-bit sRGB";

  const catalogueArtworks = [
    {
      number: "01",
      title: "The Ancestral Being",
      slug: "the-ancestral-being",
      image: "assets/artwork/identity-spirituality/the-ancestral-being.jpg",
      chapter: "Chapter I: Origins",
      classification: "Mixed Reality Installation",
      theme: "Ancestral Memory and Cultural Continuity",
      medium: "Digital illustration with augmented reality experience",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "Ancestry appears as a living presence carried across generations.",
      visualDescription: "A bird-like figure rises above a blue ocean and open sky.",
      symbolism: "The bird suggests guidance; the ocean suggests collective memory.",
      visitorExperience: "The AR layer adds moving water, light and sound.",
      technology: "Unity, Vuforia, Suno, Visual Studio Code, OpenAI Codex",
      artisticContext: "The opening work frames ancestry as an active force.",
      keyQuestion: "What do we carry from those who came before us?",
      catalogueNote: "Inheritance is shown as memory, spirit and culture.",
      behindScenes: {
        title: "Behind the Scenes: The Ancestral Being",
        youtubeId: "-8xSTAO0T-o",
        url: "https://youtube.com/shorts/-8xSTAO0T-o?feature=share"
      },
      ar: {
        summary: "Animated water, glowing symbols and atmospheric sound.",
        interaction: "Scanning the work activates the AR scene.",
        animationNotes: "Ocean movement, light pulses and slow figure motion.",
        soundDesign: "Ambient ancestral soundscape with a slow, contemplative tone.",
        stack: ["Unity", "Vuforia", "Suno", "Visual Studio Code", "OpenAI Codex"],
        apk: {
          version: "v0.1.1",
          fileName: "AncestralBeing_v0.1.1.apk",
          size: "91 MB",
          note: "Android AR build for scanning and testing the work.",
          href: "https://drive.google.com/file/d/13nUOaxfrr_g3oY8ddJLIqAa2GBV4NahH/view?usp=sharing"
        }
      }
    },
    {
      number: "02",
      title: "The Gods Eyes",
      slug: "the-gods-eyes",
      image: "assets/artwork/identity-spirituality/the-gods-eyes.jpg",
      chapter: "Chapter I: Origins",
      classification: "Mixed Reality Installation",
      theme: "Observation, Wisdom and Collective Awareness",
      medium: "Digital illustration with augmented reality experience",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "Identity seen through observation, community and memory.",
      visualDescription: "Seven stylised figures gather beneath a warm sky.",
      symbolism: "The eyes suggest perception; the child suggests becoming.",
      visitorExperience: "AR adds blinking eyes, glowing markings and layered voices.",
      technology: "Unity, Vuforia, Suno, Visual Studio Code, OpenAI Codex",
      artisticContext: "The work links identity to relationship and shared gaze.",
      keyQuestion: "How do we understand ourselves through the eyes of others?",
      catalogueNote: "A dialogue between inherited identity and social gaze.",
      ar: {
        summary: "Facial animation, eye movement, glowing symbols and sound.",
        interaction: "Scanning the work activates observation and response.",
        animationNotes: "Blinking eyes, head movement and soft glowing marks.",
        soundDesign: "Layered ambient voices and spiritual textures.",
        stack: ["Unity", "Vuforia", "Suno", "Visual Studio Code", "OpenAI Codex"],
        processVideo: {
          src: "assets/exhibition/identity-spirituality/process/the-gods-eyes-process.mp4",
          label: "The Gods Eyes Process",
          note: "Process footage from artwork to AR setup."
        },
        apk: {
          version: "v0.1.1",
          fileName: "TheGodsEyes_AR_v0.1.1.apk",
          size: "114 MB",
          note: "Android AR build for scanning and testing the work.",
          href: "https://drive.google.com/file/d/1MTefNueic3Mzc4iYflBsHiuq8KZBNuti/view?usp=sharing"
        }
      }
    },
    {
      number: "03",
      title: "Survival",
      slug: "survival",
      image: "assets/artwork/identity-spirituality/survival.jpg",
      chapter: "Chapter II: Human Experience",
      classification: "Physical Artwork",
      theme: "Resilience, Endurance and the Human Spirit",
      medium: "Physical digital illustration",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "Endurance as a physical, cultural and spiritual process.",
      visualDescription: "A central abstract figure sits within warm symbolic patterns.",
      symbolism: "The figure represents persistence; the patterns suggest pressure.",
      visitorExperience: "A quiet reflection on struggle and adaptation.",
      artisticContext: "The work moves the exhibition from origin to persistence.",
      keyQuestion: "What enables us to preserve our identity in the face of constant change?",
      catalogueNote: "Survival becomes memory, culture and adaptation."
    },
    {
      number: "04",
      title: "The Void of Souls",
      slug: "the-void-of-souls",
      image: "assets/artwork/identity-spirituality/the-void-of-souls.jpg",
      chapter: "Chapter II: Human Experience",
      classification: "Physical Artwork",
      theme: "Collective Consciousness, Spiritual Energy and the Infinite",
      medium: "Physical digital illustration",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "An unseen realm where memory and consciousness converge.",
      visualDescription: "Radial blue symbols expand across a dark ground.",
      symbolism: "The centre suggests origin; the spirals suggest transformation.",
      visitorExperience: "A slow space for reflection on invisible connection.",
      artisticContext: "The work moves from personal identity into wider consciousness.",
      keyQuestion: "Where does individual consciousness end, and collective consciousness begin?",
      catalogueNote: "A threshold between human experience and the metaphysical.",
      behindScenes: {
        title: "Behind the Scenes: The Void of Souls",
        youtubeId: "s6ktxUJGvic",
        url: "https://youtube.com/shorts/s6ktxUJGvic"
      }
    },
    {
      number: "05",
      title: "The Heart of War",
      slug: "the-heart-of-war",
      image: "assets/artwork/identity-spirituality/the-heart-of-war.jpg",
      chapter: "Chapter II: Human Experience",
      classification: "Physical Artwork",
      theme: "Conflict, Transformation and Inner Balance",
      medium: "Physical digital illustration",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "Conflict as an inner and collective force.",
      visualDescription: "A crimson mandala-like form radiates through symbolic marks.",
      symbolism: "The centre holds fear, compassion, rupture and renewal.",
      visitorExperience: "A still emotional landscape shaped by conflict.",
      artisticContext: "The emotional centre of the exhibition.",
      keyQuestion: "Can transformation emerge from the very heart of conflict?",
      catalogueNote: "Struggle becomes a site of identity and change.",
      behindScenes: {
        title: "Behind the Scenes: The Heart of War",
        youtubeId: "SdOPqtB1Pac",
        url: "https://youtube.com/shorts/SdOPqtB1Pac"
      }
    },
    {
      number: "06",
      title: "Solitude",
      slug: "solitude",
      image: "assets/artwork/identity-spirituality/solitude.jpg",
      chapter: "Chapter III: Reflection",
      classification: "Physical Artwork",
      theme: "Stillness, Reflection and Self-Discovery",
      medium: "Physical digital illustration",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "Stillness as reflection, repair and self-understanding.",
      visualDescription: "A ginger cat rests beneath a wide blue sky.",
      symbolism: "The cat suggests intuition, patience and quiet wisdom.",
      visitorExperience: "A pause for attention and reflection.",
      artisticContext: "The exhibition turns inward.",
      keyQuestion: "What can we discover about ourselves when we choose stillness over distraction?",
      catalogueNote: "A quiet pause within the exhibition."
    },
    {
      number: "07",
      title: "Human Spirits",
      slug: "human-spirits",
      image: "assets/artwork/identity-spirituality/human-spirits.jpg",
      chapter: "Chapter III: Reflection",
      classification: "Physical Artwork",
      theme: "Emotion, Collective Humanity and Spiritual Connection",
      medium: "Physical digital illustration",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "Emotion as a shared language.",
      visualDescription: "Blue forms, faces and symbols move around a central emblem.",
      symbolism: "The faces hold joy, sadness, uncertainty and reflection.",
      visitorExperience: "A movement from private feeling to collective presence.",
      artisticContext: "Emotion becomes part of identity.",
      keyQuestion: "How do our shared emotions shape the spirit of our collective humanity?",
      catalogueNote: "Spirit is carried between people.",
      behindScenes: {
        title: "Behind the Scenes: Human Spirits",
        youtubeId: "3ZHd2O7Y2vs",
        url: "https://youtube.com/shorts/3ZHd2O7Y2vs?feature=share"
      }
    },
    {
      number: "08",
      title: "Guardian of Dreams",
      slug: "guardian-of-dreams",
      image: "assets/artwork/identity-spirituality/guardian-of-dreams.jpg",
      chapter: "Chapter IV: Becoming",
      classification: "Physical Artwork",
      theme: "Spiritual Protection, Intuition and Ancestral Wisdom",
      medium: "Physical digital illustration",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "A guardian of memory, intuition and dreams.",
      visualDescription: "A ceremonial portrait framed by red, gold and symbolic marks.",
      symbolism: "The crown suggests authority; the markings hold cultural memory.",
      visitorExperience: "The figure watches over imagination and becoming.",
      artisticContext: "A protective figure within the journey of becoming.",
      keyQuestion: "Who guides us through the unseen spaces between memory, dreams and identity?",
      catalogueNote: "Unseen wisdom guides the future self."
    },
    {
      number: "09",
      title: "Girl Child",
      slug: "girl-child",
      image: "assets/artwork/identity-spirituality/girl-child.jpg",
      chapter: "Chapter IV: Becoming",
      classification: "Physical Artwork",
      theme: "Patriarchy, Resilience and Becoming",
      medium: "Physical digital illustration",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "A work about girlhood, patriarchy, endurance and becoming.",
      visualDescription: "A stylised female face emerges through bold geometric forms.",
      symbolism: "The eye suggests awareness; the divided forms suggest pressure.",
      visitorExperience: "A reflection on visibility, care and self-definition.",
      artisticContext: "Gender, power and perseverance enter the exhibition.",
      keyQuestion: "How do we become ourselves while carrying the expectations of the worlds that shape us?",
      catalogueNote: "Becoming is shown as an act of endurance."
    },
    {
      number: "10",
      title: "Cultural Identity",
      slug: "cultural-identity",
      image: "assets/artwork/identity-spirituality/cultural-identity.jpg",
      chapter: "Chapter V: Legacy",
      classification: "Physical Artwork",
      theme: "Heritage, Belonging and Cultural Continuity",
      medium: "Physical digital illustration",
      year: "2026",
      series: "Identity and Spirituality",
      artist: "Thomas Ogun",
      concept: "Culture as memory, tradition and shared experience.",
      visualDescription: "Blue and gold symbols radiate from a central circle.",
      symbolism: "The centre suggests origin; the pattern suggests continuity.",
      visitorExperience: "The exhibition closes with culture as living archive.",
      artisticContext: "The final work gathers ancestry, memory and belonging.",
      keyQuestion: "How does inherited culture shape the future self?",
      catalogueNote: "Identity is personal, ancestral, spiritual and cultural.",
      behindScenes: {
        title: "Behind the Scenes: Cultural Identity",
        youtubeId: "YKPWyTAdadA",
        url: "https://youtube.com/shorts/YKPWyTAdadA?feature=share"
      }
    }
  ];

  const catalogueChapters = [
    { title: "Chapter I: Origins", subtitle: "Ancestral memory and spiritual sight." },
    { title: "Chapter II: Human Experience", subtitle: "Endurance, absence and conflict." },
    { title: "Chapter III: Reflection", subtitle: "Interior life and collective presence." },
    { title: "Chapter IV: Becoming", subtitle: "Protection, perseverance and the future self." },
    { title: "Chapter V: Legacy", subtitle: "Inheritance, belonging and continuity." }
  ];

  const html = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const CatalogueHero = () => `
    <section class="catalogue-hero" id="cover">
      <div class="shell catalogue-hero-grid">
        <div class="catalogue-cover-copy reveal">
          <p class="eyebrow">A Mixed Reality Exhibition</p>
          <h1>Identity and Spirituality</h1>
          <p class="catalogue-subtitle">Ancestry, memory and consciousness through art and technology</p>
          <p class="catalogue-artist">Thomas Ogun<br><span>Visual Artist | Creative Technologist</span></p>
          <div class="button-row">
            <a class="btn btn-primary" href="documents/identity-and-spirituality-catalogue.pdf" download>Download Catalogue PDF</a>
            <a class="btn btn-secondary" href="exhibition.html">Exhibition Microsite</a>
          </div>
        </div>
        <div class="catalogue-cover-art reveal delay-1">
          <figure class="catalogue-image-placeholder">
            <img src="${html(catalogueArtworks[1].image)}" alt="${html(catalogueArtworks[1].title)} artwork" loading="eager">
          </figure>
          <dl>
            <div><dt>Format</dt><dd>Eight physical works and two AR installations</dd></div>
            <div><dt>Series</dt><dd>Identity and Spirituality</dd></div>
            <div><dt>Physical</dt><dd>${html(physicalPresentation)}</dd></div>
            <div><dt>Digital</dt><dd>${html(digitalPaintingSpecs)}</dd></div>
            <div><dt>Year</dt><dd>2026</dd></div>
          </dl>
        </div>
      </div>
    </section>
  `;

  const TableOfContents = () => `
    <nav class="catalogue-toc shell" aria-label="Catalogue sections">
      ${[
        ["overview", "Overview"],
        ["technology", "Technology"],
        ["journey", "Journey"],
        ["artworks", "Entries"],
        ["ar-documentation", "AR Process"],
        ["essay", "Essay"],
        ["process", "Process"],
        ["artwork-list", "Artwork List"]
      ].map(([id, label]) => `<a href="#${id}">${html(label)}</a>`).join("")}
    </nav>
  `;

  const ExhibitionOverview = () => `
    <section class="section catalogue-section" id="overview">
      <div class="shell catalogue-two-column">
        <div class="section-heading reveal">
          <p class="eyebrow">Overview</p>
          <h2>Exhibition Overview</h2>
        </div>
        <div class="catalogue-text reveal delay-1">
          <p><strong>Identity and Spirituality</strong> explores ancestry, memory, culture and spiritual identity.</p>
          <p>Eight physical digital illustrations form the core. Two works extend into AR.</p>
        </div>
      </div>
    </section>
  `;

  const TechnologyStatement = () => `
    <section class="section muted catalogue-section" id="technology">
      <div class="shell catalogue-two-column">
        <div class="section-heading reveal">
          <p class="eyebrow">Creative Technology</p>
          <h2>Focused Use of Augmented Reality</h2>
        </div>
        <div class="catalogue-text reveal delay-1">
          <p>AR appears only in <strong>The Ancestral Being</strong> and <strong>The Gods Eyes</strong>.</p>
          <ul class="technology-list">
            <li>Unity</li>
            <li>Vuforia</li>
            <li>Suno</li>
            <li>Visual Studio Code</li>
            <li>OpenAI Codex</li>
          </ul>
        </div>
      </div>
    </section>
  `;

  const ArtworkCard = artwork => `
    <a class="catalogue-artwork-card ${artwork.ar ? "is-ar-work" : ""} reveal" href="#${html(artwork.slug)}">
      <figure class="catalogue-card-image">
        <img src="${html(artwork.image)}" alt="${html(artwork.title)} artwork" loading="lazy">
      </figure>
      <div>
        <span>${html(artwork.number)} / ${artwork.ar ? "Mixed Reality" : "Physical"}</span>
        <h3>${html(artwork.title)}</h3>
        <p>${html(artwork.theme)}</p>
      </div>
    </a>
  `;

  const ChapterSection = chapter => {
    const works = catalogueArtworks.filter(artwork => artwork.chapter === chapter.title);
    return `
      <section class="catalogue-chapter reveal" id="${slugify(chapter.title)}">
        <div class="catalogue-chapter-heading">
          <p class="eyebrow">${html(chapter.title)}</p>
          <h3>${html(chapter.subtitle)}</h3>
        </div>
        <div class="catalogue-card-grid">
          ${works.map(ArtworkCard).join("")}
        </div>
      </section>
    `;
  };

  const BehindScenesPlayer = artwork => {
    if (!artwork.behindScenes) return "";

    return `
      <article class="catalogue-process-player">
        <figure>
          <iframe
            src="https://www.youtube-nocookie.com/embed/${html(artwork.behindScenes.youtubeId)}"
            title="${html(artwork.behindScenes.title)}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
          <figcaption>
            <span>${html(artwork.behindScenes.title)}</span>
            <a href="${html(artwork.behindScenes.url)}" target="_blank" rel="noopener">Open on YouTube</a>
          </figcaption>
        </figure>
      </article>
    `;
  };

  const ArtworkDetail = artwork => `
    <article class="catalogue-detail ${artwork.ar ? "is-ar-work" : ""} reveal" id="${html(artwork.slug)}">
      <div class="catalogue-detail-media">
        <figure class="catalogue-detail-image">
          <img src="${html(artwork.image)}" alt="${html(artwork.title)} artwork" loading="lazy">
        </figure>
        <dl class="catalogue-metadata compact">
          <div><dt>No.</dt><dd>${html(artwork.number)}</dd></div>
          <div><dt>Class</dt><dd>${html(artwork.classification)}</dd></div>
          <div><dt>Medium</dt><dd>${html(artwork.medium)}</dd></div>
          <div><dt>Physical</dt><dd>${html(physicalPresentation)}</dd></div>
          <div><dt>Digital</dt><dd>${html(digitalPaintingSpecs)}</dd></div>
          <div><dt>Year</dt><dd>${html(artwork.year)}</dd></div>
          ${artwork.technology ? `<div><dt>Tech</dt><dd>${html(artwork.technology)}</dd></div>` : ""}
        </dl>
      </div>
      <div class="catalogue-detail-content">
        <p class="eyebrow">Artwork ${html(artwork.number)} / ${artwork.ar ? "Mixed Reality Installation" : "Physical Artwork"}</p>
        <h3>${html(artwork.title)}</h3>
        <p class="catalogue-entry-theme">${html(artwork.theme)}</p>
        <div class="catalogue-fields">
          <section class="wide"><h4>Concept</h4><p>${html(artwork.concept)}</p></section>
          <section><h4>Visual Description</h4><p>${html(artwork.visualDescription)}</p></section>
          <section><h4>Symbolism</h4><p>${html(artwork.symbolism)}</p></section>
          <section><h4>Visitor Experience</h4><p>${html(artwork.visitorExperience)}</p></section>
          ${artwork.ar ? `<section><h4>Creative Technology</h4><p>${html(artwork.ar.summary)}</p></section>` : ""}
          <section><h4>Artistic Context</h4><p>${html(artwork.artisticContext)}</p></section>
          ${artwork.catalogueNote ? `<section class="wide"><h4>Catalogue Note</h4><p>${html(artwork.catalogueNote)}</p></section>` : ""}
          <section class="wide key-question"><h4>Key Question</h4><p>${html(artwork.keyQuestion)}</p></section>
        </div>
      </div>
    </article>
  `;

  const ARDocumentation = () => `
    <section class="section catalogue-section" id="ar-documentation">
      <div class="shell">
        <div class="section-heading reveal"><p class="eyebrow">AR Process</p><h2>Mixed Reality Installations</h2></div>
        <div class="ar-doc-grid">
          ${catalogueArtworks.filter(artwork => artwork.ar).map(artwork => `
            <article class="ar-doc-card reveal" id="${html(artwork.slug)}-ar">
              <figure class="ar-doc-image">
                <img src="${html(artwork.image)}" alt="${html(artwork.title)} physical artwork" loading="lazy">
              </figure>
              <div class="ar-doc-content">
                <p class="eyebrow">${html(artwork.number)} / AR Work</p>
                <h3>${html(artwork.title)}</h3>
                <p class="ar-doc-summary">${html(artwork.ar.summary)}</p>
                <dl class="catalogue-metadata compact">
                  <div><dt>Interaction</dt><dd>${html(artwork.ar.interaction)}</dd></div>
                  <div><dt>Animation Notes</dt><dd>${html(artwork.ar.animationNotes)}</dd></div>
                  <div><dt>Sound Design</dt><dd>${html(artwork.ar.soundDesign)}</dd></div>
                  <div><dt>Stack</dt><dd>${artwork.ar.stack.map(html).join(", ")}</dd></div>
                </dl>
                <div class="ar-doc-placeholders">
                  <div>AR media to be added</div>
                  ${artwork.ar.apk ? `
                    <div class="ar-build-card">
                      <span>Android Build</span>
                      <strong>${html(artwork.ar.apk.fileName)}</strong>
                      <p>${html(artwork.ar.apk.note)}</p>
                      <small>${html(artwork.ar.apk.version)} / ${html(artwork.ar.apk.size)}</small>
                      ${artwork.ar.apk.href
                        ? `<a class="btn btn-primary" href="${html(artwork.ar.apk.href)}" target="_blank" rel="noopener">Open Android Build</a>`
                        : `<button class="btn btn-secondary" type="button" disabled>Release link pending</button>`}
                    </div>
                  ` : `<div>QR code to be added</div>`}
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  const CuratorialEssay = () => `
    <section class="section muted catalogue-section" id="essay">
      <div class="shell catalogue-essay reveal">
        <p class="eyebrow">Curatorial Essay</p>
        <h2>Between Memory and Imagination</h2>
        <div class="essay-placeholder">
          <p><strong>Identity and Spirituality</strong> moves through ancestry, memory, conflict, reflection and legacy.</p>
          <p>The works treat identity as inherited, lived and continually remade.</p>
          <p>AR appears only where movement, sound and interaction extend the artwork.</p>
        </div>
      </div>
    </section>
  `;

  const CreativeProcess = () => `
    <section class="section catalogue-section" id="process">
      <div class="shell">
        <div class="section-heading reveal"><p class="eyebrow">Process</p><h2>Creative Process</h2></div>
        <article class="process-feature reveal">
          <div>
            <p class="eyebrow">The Gods Eyes</p>
            <h3>Digital Workflow</h3>
            <p>From artwork development to mixed reality setup.</p>
          </div>
          <figure class="ar-process-video">
            <video src="assets/exhibition/identity-spirituality/process/the-gods-eyes-process.mp4" controls preload="metadata"></video>
            <figcaption>The Gods Eyes Process<span>Artwork development and AR preparation footage.</span></figcaption>
          </figure>
        </article>
        <div class="process-placeholder-grid">
          ${["Sketches", "Colour studies", "Unity/Vuforia setup", "AR testing", "Final installation records"]
            .map(item => `<article class="process-placeholder reveal"><div></div><h3>${html(item)}</h3><p>Reserved for supporting material.</p></article>`).join("")}
        </div>
        <div class="section-heading reveal catalogue-bts-heading">
          <p class="eyebrow">Behind the Scenes</p>
          <h2>Artwork Process Videos</h2>
        </div>
        <div class="catalogue-bts-grid">
          ${catalogueArtworks.filter(artwork => artwork.behindScenes).map(BehindScenesPlayer).join("")}
        </div>
      </div>
    </section>
  `;

  const ArtworkList = () => `
    <section class="section muted catalogue-section" id="artwork-list">
      <div class="shell">
        <div class="section-heading reveal"><p class="eyebrow">Appendix</p><h2>Artwork List</h2></div>
        <div class="artwork-list-table-wrap reveal">
          <table class="artwork-list-table">
            <thead><tr><th>No.</th><th>Title</th><th>Classification</th><th>Medium</th><th>Year</th><th>Notes</th></tr></thead>
            <tbody>
              ${catalogueArtworks.map(artwork => `
                <tr>
                  <td>${html(artwork.number)}</td>
                  <td>${html(artwork.title)}</td>
                  <td>${html(artwork.classification)}</td>
                  <td>${html(artwork.medium)}</td>
                  <td>${html(artwork.year)}</td>
                  <td>${artwork.ar ? "AR process materials included; " : ""}Physical: ${html(physicalPresentation)}; Digital: ${html(digitalPaintingSpecs)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  const ExhibitionJourney = () => `
    <section class="section catalogue-section" id="journey">
      <div class="shell">
        <div class="section-heading reveal"><p class="eyebrow">Journey</p><h2>Exhibition Journey</h2></div>
        <div class="catalogue-chapters">
          ${catalogueChapters.map(ChapterSection).join("")}
        </div>
      </div>
    </section>
  `;

  const ArtworkDetails = () => `
    <section class="section muted catalogue-section" id="artworks">
      <div class="shell">
        <div class="section-heading reveal"><p class="eyebrow">Artwork Details</p><h2>Catalogue Entries</h2></div>
        <div class="catalogue-detail-list">
          ${catalogueArtworks.map(ArtworkDetail).join("")}
        </div>
      </div>
    </section>
  `;

  app.innerHTML = [
    CatalogueHero(),
    TableOfContents(),
    ExhibitionOverview(),
    TechnologyStatement(),
    ExhibitionJourney(),
    ArtworkDetails(),
    ARDocumentation(),
    CuratorialEssay(),
    CreativeProcess(),
    ArtworkList()
  ].join("");

  const scrollToHashTarget = () => {
    if (!window.location.hash) return;
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ block: "start" });
  };

  /* Catalogue sections are rendered after main.js starts observing reveal items. */
  requestAnimationFrame(() => {
    app.querySelectorAll(".reveal").forEach(item => item.classList.add("visible"));
    requestAnimationFrame(scrollToHashTarget);
  });

  window.addEventListener("hashchange", scrollToHashTarget);
});
