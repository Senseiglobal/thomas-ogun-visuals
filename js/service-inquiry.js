document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-service-inquiry]");
  if (!form) return;

  const steps = Array.from(form.querySelectorAll("[data-brief-step]"));
  const progressSteps = Array.from(document.querySelectorAll("[data-progress-step]"));
  const formCard = form.closest(".brief-form-card");
  const confirmation = formCard?.querySelector("[data-inquiry-confirmation]");
  const confirmationMessage = confirmation?.querySelector("[data-confirmation-message]");
  const consultationCheckout = confirmation?.querySelector("[data-consultation-checkout]");
  const portfolioLink = confirmation?.querySelector("[data-portfolio-link]");
  const status = form.querySelector("[data-inquiry-status]");
  const submitButton = form.querySelector("[data-inquiry-submit]");
  const timingSelect = form.querySelector("#project-timing");
  const rushNotice = form.querySelector("[data-rush-notice]");
  const dateInput = form.querySelector("#project-date");
  let currentStep = 1;

  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split("T")[0];
  }

  const showStep = stepNumber => {
    currentStep = Math.min(Math.max(stepNumber, 1), steps.length);

    steps.forEach(step => {
      const isActive = Number(step.dataset.briefStep) === currentStep;
      step.hidden = !isActive;
      step.classList.toggle("is-active", isActive);
    });

    progressSteps.forEach(progressStep => {
      const progressNumber = Number(progressStep.dataset.progressStep);
      progressStep.classList.toggle("is-current", progressNumber === currentStep);
      progressStep.classList.toggle("is-complete", progressNumber < currentStep);
    });

    const activeStep = steps.find(step => Number(step.dataset.briefStep) === currentStep);
    const firstField = activeStep?.querySelector("input:not([type='radio']):not([type='checkbox']), select, textarea, input[type='radio']");
    if (firstField && currentStep > 1) {
      window.setTimeout(() => firstField.focus({ preventScroll: true }), 80);
    }
  };

  const clearInvalidState = field => {
    if (field.checkValidity()) field.classList.remove("is-invalid");
  };

  form.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("input", () => clearInvalidState(field));
    field.addEventListener("change", () => clearInvalidState(field));
  });

  const validateStep = stepNumber => {
    const step = steps.find(item => Number(item.dataset.briefStep) === stepNumber);
    if (!step) return true;

    const fields = Array.from(step.querySelectorAll("input, select, textarea"));
    const invalidFields = fields.filter(field => !field.checkValidity());

    fields.forEach(field => field.classList.toggle("is-invalid", !field.checkValidity()));

    if (invalidFields.length) {
      const firstInvalid = invalidFields[0];
      firstInvalid.reportValidity();
      firstInvalid.focus();
      return false;
    }

    return true;
  };

  form.querySelectorAll("[data-next-step]").forEach(button => {
    button.addEventListener("click", () => {
      if (validateStep(currentStep)) showStep(currentStep + 1);
    });
  });

  form.querySelectorAll("[data-previous-step]").forEach(button => {
    button.addEventListener("click", () => showStep(currentStep - 1));
  });

  const updateRushNotice = () => {
    if (!timingSelect || !rushNotice) return;
    const isRush = timingSelect.value.includes("Rush") || timingSelect.value.includes("Weekend");
    rushNotice.hidden = !isRush;
  };

  timingSelect?.addEventListener("change", updateRushNotice);

  const budgetCapacity = {
    "Under $1,000": 999,
    "$1,000 to $2,500": 2500,
    "$2,500 to $5,000": 5000,
    "$5,000 to $10,000": 10000,
    "$10,000+": 15000,
    "Not confirmed": 0
  };

  const packageMinimum = {
    "Cinematic Editing": 1500,
    "Creative Direction": 2500,
    "Illustration and Editorial Design": 650,
    "Brand Content System": 1200,
    "AR and Interactive Prototype": 3500,
    "Creative Strategy Consultation": 250
  };

  const buildQualification = values => {
    const budgetMax = budgetCapacity[values.budget] || 0;
    const minimum = packageMinimum[values.project_package] || 1000;
    const budgetAligned = budgetMax >= minimum;
    const goalDetail = (values.project_goal || "").trim().length;
    const hasReferences = (values.reference_links || "").trim().length > 8;
    const standardTiming = !String(values.timing || "").includes("Rush") && !String(values.timing || "").includes("Weekend");
    const decisionRole = ["Founder or business owner", "Producer or project manager", "Marketing or brand lead", "Agency representative"].includes(values.client_role);
    let score = 0;

    if (budgetAligned) score += 40;
    if (goalDetail >= 80) score += 20;
    else if (goalDetail >= 40) score += 12;
    if (standardTiming) score += 15;
    if (decisionRole) score += 10;
    if (hasReferences) score += 5;
    if (values.preferred_completion_date) score += 10;

    const qualified = budgetAligned && score >= 65;
    return {
      score,
      qualified,
      summary: qualified
        ? `Priority review: budget aligns with the ${values.project_package} starting scope and the brief contains sufficient planning detail.`
        : `Standard review: the studio should confirm scope, budget fit or the most suitable entry route for ${values.project_package}.`
    };
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!validateStep(currentStep)) return;

    const formData = new FormData(form);
    if (formData.get("website")) return;

    const values = Object.fromEntries(formData.entries());
    const qualification = buildQualification(values);
    const defaultSubmitLabel = submitButton?.textContent || "Submit Project Brief";

    if (status) {
      status.textContent = "Sending your brief securely...";
      status.classList.remove("is-error");
      status.classList.add("is-sending");
    }
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    const payload = {
      ...values,
      lead_score: `${qualification.score}/100`,
      qualification_status: qualification.qualified ? "Priority review" : "Standard review",
      qualification_summary: qualification.summary,
      rush_premium_notice: String(values.timing || "").includes("Rush") || String(values.timing || "").includes("Weekend") ? "25% premium applies if approved" : "Not applicable",
      submission_source: "Thomas Ogun Visuals on-site project inquiry",
      _subject: `${qualification.qualified ? "Priority" : "Standard"} Project Inquiry | ${values.project_package} | ${values.name}`,
      _template: "table",
      _captcha: "false",
      _url: "https://thomasogunvisuals.com/service-inquiry.html",
      _autoresponse: "Thank you for your project inquiry. Your brief has been received by Thomas Ogun Visuals and Gayatek Nation & Media. We review briefs Monday to Friday and will reply within 24 to 48 hours if the project aligns. Standard projects begin after scope approval, a signed agreement and a 50% deposit. Please keep this email as your submission confirmation. Thomas Ogun Visuals"
    };

    delete payload.website;

    try {
      const response = await fetch("https://formsubmit.co/ajax/bookings@thomasogunvisuals.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "The brief could not be sent.");
      }

      if (confirmationMessage) {
        if (values.project_package === "Creative Strategy Consultation") {
          confirmationMessage.textContent = "Your consultation brief is safely received. Complete the secure Stripe checkout below, then choose your 60-minute session time on Calendly after payment.";
        } else {
          confirmationMessage.textContent = qualification.qualified
            ? "Your budget, timing and project detail align with our standard engagement route. The studio will review the brief and send the next verified step within 24 to 48 hours."
            : "Your brief is safely received. The studio will assess the most suitable scope or consultation route and reply within 24 to 48 hours.";
        }
      }

      const isConsultation = values.project_package === "Creative Strategy Consultation";
      if (consultationCheckout) consultationCheckout.hidden = !isConsultation;
      if (portfolioLink) portfolioLink.hidden = isConsultation;

      form.hidden = true;
      formCard?.querySelector(".brief-progress")?.setAttribute("hidden", "");
      if (confirmation) {
        confirmation.hidden = false;
        confirmation.focus({ preventScroll: true });
      }
      formCard?.scrollIntoView({ behavior: "smooth", block: "start" });
      form.reset();
    } catch (error) {
      if (status) {
        status.textContent = "We could not send your brief. Please try again, or email bookings@thomasogunvisuals.com.";
        status.classList.remove("is-sending");
        status.classList.add("is-error");
      }
      if (submitButton) submitButton.textContent = "Try Again";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        if (submitButton.textContent === "Sending...") submitButton.textContent = defaultSubmitLabel;
      }
    }
  });

  showStep(1);
});
