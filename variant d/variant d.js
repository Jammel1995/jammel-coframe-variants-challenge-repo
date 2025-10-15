console.log("Memory Air - Updating hero image variant");

// Wait for the main hero image to be available
const heroSelectors = ["#lp-pom-box-417", "#lp-pom-image-120 > div > img"];
const newHeroImageUrl =
  "https://duploservices-prod-mark-1-coframe-render-images-897729117657.s3.us-west-2.amazonaws.com/cro-agent-images/memoryair/5c62cd7a-ced4-4795-a099-f7ac2ff6ee42.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CBGTHXMTQMHTEJ4%2F20251013%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251013T175114Z&X-Amz-Expires=86400&X-Amz-Signature=22fed0d8fdac3926341426c9c56ea766024c8e03d211f50044d060acff00aebb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject";

function updateHeroImage() {
  let updated = false;
  heroSelectors.forEach((selector) => {
    const heroElement = document.querySelector(selector);
    if (heroElement) {
      console.log(
        `Found hero element with selector '${selector}', applying update.`
      );

      // Handle img tags and background images differently
      if (heroElement.tagName === "IMG") {
        heroElement.src = newHeroImageUrl;
      } else {
        heroElement.style.backgroundImage = `url('${newHeroImageUrl}')`;
      }
      updated = true;
    }
  });

  if (updated) {
    // Emit variantRendered event after successful update
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: "variantRendered" });

    console.log("Hero image updated successfully by changing background");
  }

  return updated;
}

// Try to update immediately
if (!updateHeroImage()) {
  // If element not found, wait for it using MutationObserver
  console.log("Hero image not found, waiting for page to load...");

  const observer = new MutationObserver(() => {
    if (updateHeroImage()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Safety timeout to stop observing after 10 seconds
  setTimeout(() => {
    observer.disconnect();
    const elementFound = heroSelectors.some((selector) =>
      document.querySelector(selector)
    );
    if (!elementFound) {
      console.error("Hero image elements not found after timeout");
    }
  }, 10000);
}
