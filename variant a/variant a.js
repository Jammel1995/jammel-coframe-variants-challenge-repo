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

  if (!headlineElement) {
    console.error('Hero headline element not found');
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

  // Emit variantRendered event after successful modification
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

// Use the utility to wait for the hero headline to be available
monitorChangesByConditionAndRun(
  () => document.querySelector('#hero-section h1.headline-xl') !== null,
  applyVariant,
);