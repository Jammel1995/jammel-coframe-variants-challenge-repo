/**
 * @file Replaces the hero headline with "Spend Smarter, Move Faster."
 * @name Ramp.com - New Hero Headline
 */

/**
 * A utility that waits for a condition to be met before running a callback.
 * It uses MutationObserver to efficiently check for changes in the DOM.
 *
 * @param condition A function that returns true when the condition is met.
 * @param callback The function to run once the condition is met.
 * @param timeout The maximum time to wait in milliseconds.
 * @param disconnectOnRun Whether to disconnect the observer after the callback is run.
 */
function monitorChangesByConditionAndRun(
  condition: () => boolean,
  callback: () => void,
  timeout = 10000,
  disconnectOnRun = true,
): void {
  if (condition()) {
    callback();
    return;
  }

  let timeoutId: number | undefined;
  const observer = new MutationObserver(() => {
    if (condition()) {
      if (disconnectOnRun) {
        observer.disconnect();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      callback();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  if (timeout > 0) {
    timeoutId = window.setTimeout(() => {
      console.error('monitorChangesByConditionAndRun timed out');
      observer.disconnect();
    }, timeout);
  }
}

// Main function to apply changes
function applyVariant(): void {
  const headlineElement = document.querySelector<HTMLHeadingElement>(
    '#hero-section h1.headline-xl',
  );
  const heroSection = document.querySelector<HTMLElement>('#hero-section');

  if (!headlineElement || !heroSection) {
    console.error('Required hero elements not found');
    return;
  }

  // Replace the headline content
  headlineElement.innerHTML = ''; // Clear existing content
  headlineElement.append(
    <>
      Spend Smarter,
      <br />
      Move Faster.
    </>,
  );

  // Add the 'How It Works' section after the hero section
  heroSection.after(<HowItWorksSection />);

  // Setup the animation for the 'How It Works' section
  setupStepAnimation();

  // Emit variantRendered event after successful modification
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

// Use the utility to wait for the hero headline to be available
monitorChangesByConditionAndRun(
  () => document.querySelector('#hero-section h1.headline-xl') !== null,
  applyVariant,
);

/**
 * Sets up an interval-based animation to cycle through the steps
 * in the "How It Works" section, updating styles and images.
 */
function setupStepAnimation() {
  // Defines the image URLs for the step animation
  const images = [
    'https://duploservices-prod-mark-1-coframe-render-images-897729117657.s3.us-west-2.amazonaws.com/cro-agent-images/ramp/ba66a049-1463-42dc-97f2-042817b489f3.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CBGTHXMTQMHTEJ4%2F20251013%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251013T165134Z&X-Amz-Expires=86400&X-Amz-Signature=da1eab6954c3e48e2f558db8b904575b6c11c8018639aaf0bac0c3c946d98bc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
    'https://duploservices-prod-mark-1-coframe-render-images-897729117657.s3.us-west-2.amazonaws.com/cro-agent-images/ramp/c2966113-1f1b-45f1-b69a-5d317cf659ee.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CBGTHXMTQMHTEJ4%2F20251013%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251013T165517Z&X-Amz-Expires=86400&X-Amz-Signature=bc4c7d0fcd5acbc90ee3963745959ca81b0c2fc61d34f95cbc1603f77a62439e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
    'https://duploservices-prod-mark-1-coframe-render-images-897729117657.s3.us-west-2.amazonaws.com/cro-agent-images/ramp/51deef1d-e827-4a5a-9d23-ee1283687105.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CBGTHXMTQMHTEJ4%2F20251013%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251013T165516Z&X-Amz-Expires=86400&X-Amz-Signature=04947b9a98b5095967532281c179813aaf1ed980438be488d4a1e512f4508e52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
  ];

  const imageElement = document.querySelector<HTMLImageElement>(
    '[data-testid="how-it-works-image"]',
  );
  const stepItems = document.querySelectorAll<HTMLDivElement>(
    '[data-testid^="step-item-"]',
  );

  if (!imageElement || stepItems.length === 0) {
    console.error('Animation elements for How It Works section not found.');
    return;
  }

  let currentStep = 0;
  const totalSteps = stepItems.length;

  const updateStep = (stepIndex: number) => {
    // Update styles for each step item
    stepItems.forEach((item, index) => {
      const circle = item.querySelector('[data-testid="step-circle"]');
      const stepNumber = item.querySelector('[data-testid="step-number"]');

      if (index === stepIndex) {
        // Active state
        circle?.classList.remove('cf:bg-[#F4F2F0]');
        circle?.classList.add('cf:bg-solar');
        stepNumber?.classList.add('cf:text-primary');
      } else {
        // Inactive state
        circle?.classList.remove('cf:bg-solar');
        circle?.classList.add('cf:bg-[#F4F2F0]');
        stepNumber?.classList.remove('cf:text-primary');
      }
    });

    // Update image with a fade effect
    imageElement.style.opacity = '0';
    setTimeout(() => {
      imageElement.src = images[stepIndex];
      imageElement.style.opacity = '1';
    }, 300); // Corresponds to the fade duration
  };

  // Set the initial state
  updateStep(0);

  // Auto-animate through steps
  setInterval(() => {
    currentStep = (currentStep + 1) % totalSteps;
    updateStep(currentStep);
  }, 4000); // 4-second interval
}

/**
 * Renders the "How It Works" section with a title, subtitle, steps, and a CTA.
 */
function HowItWorksSection() {
  return (
    <section className="cf:bg-white cf:py-16 cf:lg:py-24">
      <div className="cf:mx-auto cf:w-full cf:max-w-screen-2xl cf:px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16">
        <div className="cf:mx-auto cf:max-w-3xl cf:text-center">
          <h2 className="leading-trim headline-l">
            Get started in 3 simple steps
          </h2>
          <p className="leading-trim body-m text-hushed cf:mt-6">
            Simplify your finances and empower your team to move faster.
          </p>
        </div>
        <div className="cf:mt-16 cf:grid cf:grid-cols-1 cf:items-center cf:gap-12 cf:lg:grid-cols-2 cf:lg:gap-16">
          <ImagePlaceholder />
          <div className="cf:flex cf:flex-col cf:gap-8">
            <StepItem
              step="01"
              title="Sign up & issue cards in minutes"
              description="Get started in minutes with a simple onboarding. Issue physical and virtual cards with built-in controls."
              isLast={false}
              testId="step-item-0"
            />
            <StepItem
              step="02"
              title="Automate your expense reporting"
              description="Ramp’s AI-powered platform automatically collects receipts, categorizes spending, and syncs with your accounting software."
              isLast={false}
              testId="step-item-1"
            />
            <StepItem
              step="03"
              title="Optimize spend and save"
              description="Identify savings opportunities and control spend before it happens with real-time insights and customizable policies."
              isLast={true}
              testId="step-item-2"
            />
          </div>
        </div>
        <div className="cf:mt-16 cf:text-center">
          <a
            href="/see-a-demo"
            className="group/link cf:lg:flex-auto relative flex justify-center items-center text-center rounded-md transition ease-in-out duration-300 cf:disabled:cursor-not-allowed body-s px-4 py-3 leading-[.65rem] bg-solar cf:hover:bg-solarLight text-primary cf:inline-flex"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Renders a placeholder for an image.
 */
function ImagePlaceholder() {
  return (
    <div className="cf:flex cf:h-96 cf:items-center cf:justify-center cf:rounded-lg cf:bg-gray-100 cf:lg:h-[500px]">
      <img
        data-testid="how-it-works-image"
        src="https://duploservices-prod-mark-1-coframe-render-images-897729117657.s3.us-west-2.amazonaws.com/cro-agent-images/ramp/ba66a049-1463-42dc-97f2-042817b489f3.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CBGTHXMTQMHTEJ4%2F20251013%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251013T165134Z&X-Amz-Expires=86400&X-Amz-Signature=da1eab6954c3e48e2f558db8b904575b6c11c8018639aaf0bac0c3c946d98bc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
        alt="How Ramp works"
        className="cf:h-full cf:w-full cf:rounded-lg cf:object-cover cf:opacity-100 cf:transition-opacity cf:duration-300"
      />
    </div>
  );
}

/**
 * Renders a single step item for the "How It Works" section.
 * @param {object} props - The properties for the component.
 * @param {string} props.step - The step number.
 * @param {string} props.title - The title of the step.
 * @param {string} props.description - The description of the step.
 * @param {boolean} props.isLast - Whether this is the last step.
 * @param {string} props.testId - A unique test ID for the element.
 */
function StepItem({
  step,
  title,
  description,
  isLast,
  testId,
}: {
  step: string;
  title: string;
  description: string;
  isLast: boolean;
  testId: string;
}) {
  return (
    <div className="cf:relative cf:flex cf:items-start cf:gap-6" data-testid={testId}>
      {!isLast && (
        <div className="cf:absolute cf:left-6 cf:top-12 cf:h-full cf:w-px cf:bg-[#E5E5E5]" />
      )}
      <div
        data-testid="step-circle"
        className="cf:z-10 cf:flex cf:size-12 cf:shrink-0 cf:items-center cf:justify-center cf:rounded-full cf:bg-[#F4F2F0] cf:transition-colors cf:duration-300"
      >
        <span
          data-testid="step-number"
          className="headline-s cf:text-primary cf:transition-colors cf:duration-300"
        >
          {step}
        </span>
      </div>
      <div>
        <h3 className="body-l cf:font-medium cf:text-primary">{title}</h3>
        <p className="body-m text-hushed cf:mt-2">{description}</p>
      </div>
    </div>
  );
}