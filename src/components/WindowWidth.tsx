import { useEffect, useState } from "react";

// The ONE live effect required by the task.
// Effect reads nothing from props/state, so the dependency array is
// empty — it subscribes once on mount and cleans up once on unmount.
export default function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup: prevents a dangling listener from firing setState on a
    // component that's already unmounted (the classic React warning
    // "Can't perform a state update on an unmounted component").
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="window-width" title="Live effect: window resize listener">
      Window width: {width}px
    </div>
  );
}
