//
//
// ramp-team-success-stories-variant.tsx
//

/**
 * Inserts a "Team Success Stories" section after the hero section.
 * This variant is designed to build trust and encourage conversions by showcasing positive user experiences.
 */

// Utility function to wait for an element to be available in the DOM.
function monitorChangesByConditionAndRun(
  condition: () => boolean,
  callback: () => void,
  disconnectAfterRun: boolean = true
) {
  const observer = new MutationObserver((mutations, obs) => {
    if (condition()) {
      callback();
      if (disconnectAfterRun) {
        obs.disconnect();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Data for the success stories.
const successStories = [
  {
    avatar: 'https://i.pravatar.cc/80?u=1',
    name: 'Sarah P.',
    role: 'VP of Finance, Innovate Inc.',
    quote:
      'Ramp saved us over 20 hours a month on expense reports alone. It’s a complete game-changer for our finance team!',
    stat: 'Saved $50K in 3 months',
  },
  {
    avatar: 'https://i.pravatar.cc/80?u=2',
    name: 'Michael B.',
    role: 'Marketing Lead, Growth Co.',
    quote:
      'With Ramp, I can issue cards to my team in seconds and track campaign spending in real-time. Unbeatable control and visibility.',
    stat: '4x faster campaign launches',
  },
  {
    avatar: 'https://i.pravatar.cc/80?u=3',
    name: 'Jessica L.',
    role: 'Operations Manager, ScaleUp',
    quote:
      'We switched from a legacy provider and Ramp’s automation has streamlined our entire procurement process. We’re never going back.',
    stat: '95% expense compliance',
  },
];

// --- JSX Components ---

function SuccessStoryCard({ avatar, name, role, quote, stat }: (typeof successStories)[0]) {
  return (
    <div className="cf-story-card cf:flex cf:flex-col cf:gap-4 cf:rounded-xl cf:border cf:border-black/[.1] cf:bg-white/5 cf:p-6 cf:transition-transform cf:duration-300 cf:hover:scale-105">
      <div className="cf:flex cf:items-center cf:gap-4">
        <img src={avatar} alt={`${name}'s avatar`} className="cf:h-16 cf:w-16 cf:rounded-full" />
        <div>
          <p className="cf:font-bold cf:text-primary">{name}</p>
          <p className="cf:text-sm cf:text-hushed">{role}</p>
        </div>
      </div>
      <blockquote className="cf:body-m cf:text-primary">"{quote}"</blockquote>
      <p className="cf:text-lg cf:font-semibold cf:text-primary">{stat}</p>
    </div>
  );
}

function TeamSuccessStoriesSection() {
  return (
    <section className="cf:w-full cf:bg-[#F4F2F0] cf:py-16 cf:sm:py-24">
      <div className="cf:mx-auto cf:max-w-screen-2xl cf:px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16">
        <div className="cf:mx-auto cf:max-w-3xl cf:text-center">
          <h2 className="headline-l cf:text-primary">
            See how teams are saving
          </h2>
          <p className="body-l cf:text-hushed cf:mt-4">
            Thousands of businesses have switched to Ramp.
          </p>
        </div>
        <div className="cf:mt-12 cf:grid cf:grid-cols-1 cf:gap-8 cf:md:grid-cols-2 cf:lg:grid-cols-3">
          {successStories.map((story) => (
            <SuccessStoryCard {...story} />
          ))}
        </div>
        <div className="cf:mt-16 cf:text-center">
          <a
            href="/see-a-demo"
            className="cf:inline-flex cf:items-center cf:justify-center cf:rounded-md cf:bg-[#E7F256] cf:px-4 cf:py-3 cf:text-[14px] cf:font-normal cf:leading-[10.4px] cf:text-primary cf:transition cf:duration-300 cf:ease-in-out cf:hover:bg-[#f0f5b1]"
          >
            See a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

// --- Main Variant Logic ---

function applyVariant() {
  const heroSection = document.querySelector('#hero-section');

  if (!heroSection) {
    console.error('Hero section not found. Cannot apply variant.');
    return;
  }

  // Prevent re-rendering if the section already exists
  if (document.querySelector('.cf-team-success-stories')) {
    return;
  }

  try {
    const successSection = <TeamSuccessStoriesSection />;
    // We need to give the new section a class to query for it, JSX doesn't add it to the element itself
    (successSection as HTMLElement).classList.add('cf-team-success-stories');
    heroSection.insertAdjacentElement('afterend', successSection as HTMLElement);

    console.log('Successfully added Team Success Stories section.');
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
  } catch (error) {
    console.error('Error applying variant:', error);
  }
}

// Run the variant logic once the hero section is available.
monitorChangesByConditionAndRun(
  () => document.querySelector('#hero-section') !== null,
  applyVariant
);