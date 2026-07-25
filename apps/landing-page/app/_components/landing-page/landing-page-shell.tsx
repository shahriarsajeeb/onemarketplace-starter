"use client";
import { useEffect, useLayoutEffect } from "react";
const sourceHtmlId = "";
const sourceHtmlClassName = "";
const sourceHtmlStyle = "";
const sourceBodyId = "";
const sourceBodyClassName =
  "bg-[#fbfbfa] font-['DM_Sans'] text-[#20211f] antialiased";
const sourceBodyStyle = "";
const inlineEventAttributeNames = [
  "click",
  "change",
  "input",
  "submit",
  "mouseover",
  "mouseout",
  "mouseenter",
  "mouseleave",
  "keydown",
  "keyup",
  "focus",
  "blur",
];

interface SourceRootAttributes {
  id: string;
  className: string;
  style: string;
}

function applyElementAttributes(
  element: HTMLElement,
  attributes: SourceRootAttributes,
) {
  const previousId = element.id;
  const previousClassName = element.className;
  const previousStyleAttribute = element.getAttribute("style");

  if (attributes.id) {
    element.id = attributes.id;
  }
  attributes.className
    .split(/\s+/)
    .filter(Boolean)
    .forEach((className) => element.classList.add(className));
  if (attributes.style) {
    element.style.cssText = [element.style.cssText, attributes.style]
      .filter(Boolean)
      .join("; ");
  }

  return () => {
    element.id = previousId;
    element.className = previousClassName;
    if (previousStyleAttribute === null) {
      element.removeAttribute("style");
    } else {
      element.setAttribute("style", previousStyleAttribute);
    }
  };
}

function applySourceRootAttributes() {
  const restoreHtml = applyElementAttributes(document.documentElement, {
    id: sourceHtmlId,
    className: sourceHtmlClassName,
    style: sourceHtmlStyle,
  });
  const restoreBody = applyElementAttributes(document.body, {
    id: sourceBodyId,
    className: sourceBodyClassName,
    style: sourceBodyStyle,
  });

  return () => {
    restoreBody();
    restoreHtml();
  };
}

function attachInlineEventHandlers(root: ParentNode) {
  const cleanups: Array<() => void> = [];

  inlineEventAttributeNames.forEach((eventName) => {
    root.querySelectorAll(`[data-aura-on${eventName}]`).forEach((element) => {
      const handlerCode = element.getAttribute(`data-aura-on${eventName}`);
      if (!handlerCode) return;

      const listener = function (event: Event) {
        const result = Function("event", handlerCode).call(element, event);
        if (result === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };
      element.addEventListener(eventName, listener);
      cleanups.push(() => element.removeEventListener(eventName, listener));
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

interface LandingPageShellProps {
  children: React.ReactNode;
}

export function LandingPageShell({ children }: LandingPageShellProps) {
  useLayoutEffect(() => applySourceRootAttributes(), []);

  useEffect(() => {
    const detachInlineEventHandlers = attachInlineEventHandlers(document);

    return detachInlineEventHandlers;
  }, []);

  return (
    <div className="aura-source-body bg-[#fbfbfa] font-['DM_Sans'] text-[#20211f] antialiased">
      {children}
    </div>
  );
}
