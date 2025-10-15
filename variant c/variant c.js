// A/B Test: "Ramp vs Other Tools" Comparison Section
// This variant adds a new section to the homepage to compare Ramp against its competitors.

// Helper function to wait for a specific element to appear in the DOM
function monitorChangesByConditionAndRun(
  predicate,
  callback,
  timeout = 5000,
  disconnectAfterFound = true
) {
  const observer = new MutationObserver((_mutations, obs) => {
    if (predicate()) {
      if (disconnectAfterFound) {
        obs.disconnect();
      }
      callback();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Timeout to prevent infinite observation
  setTimeout(() => {
    observer.disconnect();
  }, timeout);
}

// Data for the comparison cards
const comparisonData = [
  {
    title: "Corporate Cards",
    rampFeature: "Unlimited cards with built-in spend controls",
    competitorFeature: "Limited cards, complex controls",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
  },
  {
    title: "Expense Management",
    rampFeature: "Automated expense reporting with AI",
    competitorFeature: "Manual uploads and approvals",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>`,
  },
  {
    title: "Bill Payments",
    rampFeature: "Integrated bill payments and approvals",
    competitorFeature: "Requires separate software",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  },
  {
    title: "Accounting Sync",
    rampFeature: "Real-time sync with major accounting software",
    competitorFeature: "Manual data entry or delayed sync",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="8" y2="14"></line><line x1="16" y1="18" x2="8" y2="18"></line><line x1="10" y1="10" x2="14" y2="10"></line></svg>`,
  },
];

// Main function to apply changes
function applyVariant() {
  const heroSection = document.querySelector("#hero-section");
  if (!heroSection) {
    console.error("Hero section not found");
    return;
  }

  // Create and insert the new comparison section
  heroSection.after(<ComparisonSection />);

  // Notify Coframe that the variant has been rendered
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: "variantRendered" });
}

// JSX component for the entire comparison section
function ComparisonSection() {
  return (
    <section className="cf:bg-white cf:py-16 cf:lg:py-24">
      <div className="cf:mx-auto cf:w-full cf:max-w-screen-2xl cf:px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16">
        <div className="cf:mx-auto cf:max-w-3xl cf:text-center">
          <h2 className="leading-trim headline-l">Ramp vs Other Tools</h2>
          <p className="leading-trim body-m text-hushed cf:mt-6">
            See how Ramp outshines the competition with a unified, all-in-one
            platform.
          </p>
        </div>
        <div className="cf:mt-16 cf:grid cf:grid-cols-1 cf:gap-8 cf:md:grid-cols-2 cf:lg:grid-cols-4">
          {comparisonData.map((item) => (
            <ComparisonCard
              title={item.title}
              rampFeature={item.rampFeature}
              competitorFeature={item.competitorFeature}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="cf:mt-16 cf:text-center">
          <a
            href="/see-a-demo"
            className="group/link cf:lg:flex-auto relative flex justify-center items-center text-center rounded-md transition ease-in-out duration-300 cf:disabled:cursor-not-allowed body-s px-4 py-3 leading-[.65rem] bg-solar cf:hover:bg-solarLight text-primary cf:inline-flex"
          >
            See Ramp in Action
          </a>
        </div>
      </div>
    </section>
  );
}

// SVG icon components
function CheckIcon({ className }) {
  return (
    <img
      src="https://duploservices-prod-mark-1-coframe-render-images-897729117657.s3.us-west-2.amazonaws.com/cro-agent-images/ramp/410f6cfa-6744-4ce0-b548-4540c6099f1f.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CBGTHXMTQMHTEJ4%2F20251013%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251013T173246Z&X-Amz-Expires=86400&X-Amz-Signature=f4efb912ceaa22e046bbc667b89e5e3a81996aadf6b7d6fcaf922a26fb3a3da7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
      alt="Check icon"
      className={className}
    />
  );
}

function CrossIcon({ className }) {
  return (
    <img
      src="https://duploservices-prod-mark-1-coframe-render-images-897729117657.s3.us-west-2.amazonaws.com/cro-agent-images/ramp/2b697128-e829-4a5a-9f5e-7efd83d99e88.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CBGTHXMTQMHTEJ4%2F20251013%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251013T173246Z&X-Amz-Expires=86400&X-Amz-Signature=462d92e86dc9e234e27da230a41d2519ec6ac545e2fb58096502e9160c28ca64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
      alt="Cross icon"
      className={className}
    />
  );
}

// JSX component for a single comparison card
function ComparisonCard({ title, rampFeature, competitorFeature, icon }) {
  return (
    <div className="cf:flex cf:flex-col cf:rounded-lg cf:border cf:border-gray-200 cf:p-6">
      <div
        className="cf:mb-4 cf:flex cf:size-[64px] cf:items-center cf:justify-center cf:rounded-lg cf:bg-[#F4F2F0]"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <h3 className="body-l cf:font-medium cf:text-primary">{title}</h3>
      <div className="cf:mt-4 cf:flex cf:flex-col cf:gap-4">
        <div className="cf:flex cf:items-start cf:gap-3">
          <CheckIcon className="cf:mt-1 cf:size-4 cf:shrink-0 cf:text-black" />
          <p className="body-m text-primary">{rampFeature}</p>
        </div>
        <div className="cf:flex cf:items-start cf:gap-3">
          <CrossIcon className="cf:mt-1 cf:size-4 cf:shrink-0 cf:text-gray-400" />
          <p className="body-m text-hushed">{competitorFeature}</p>
        </div>
      </div>
    </div>
  );
}

// Wait for the hero section to be available before applying the changes
monitorChangesByConditionAndRun(
  () => document.querySelector("#hero-section"),
  applyVariant
);
