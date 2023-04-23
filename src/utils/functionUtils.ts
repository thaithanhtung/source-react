import { MutableRefObject } from "react";

export const debounce = (f: (...props) => void, ms: number): any => {
  let timer = null;

  return (...args) => {
    const onComplete = () => {
      if (f) f.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
};

export const scrollToElement = (id: string): void => {
  const element = document.getElementById(id);
  if (!element) return null;
  element.scrollIntoView();
};

export const getPopoverPosition = (props: {
  windowSize;
  markerSize?: number;
  popoverSize;
  offsetLeft?: number;
  offsetRight?: number;
  offsetTop?: number;
  ref: MutableRefObject<HTMLDivElement>;
}) => {
  const {
    windowSize,
    markerSize = 34,
    popoverSize,
    ref,
    offsetLeft = 0,
    offsetRight = 0,
    offsetTop = 0,
  } = props;
  const gapPopoverMarker = 16;
  const gapPopover = 20;

  let positionStyle = {
    transform: "translate(-50%, 0)",
    bottom: `calc(100% + ${gapPopoverMarker}px)`,
    left: "50%",
  };

  if (
    windowSize &&
    windowSize.width &&
    windowSize.height &&
    ref &&
    ref.current
  ) {
    // get position point marker compare viewport
    const boundingClient = ref.current.getBoundingClientRect();
    // popover default--height: 244px,
    const popoverDefaultHeight = (popoverSize && popoverSize.height) || 244;
    // popover default--width: 240px
    const popoverDefaultWidth = (popoverSize && popoverSize.width) || 240;
    // 50% of popover width
    const popoverHalfWidth = popoverDefaultWidth / 2;
    const limitRight = windowSize.width - gapPopover - offsetRight;
    const limitLeft = popoverHalfWidth + offsetLeft;

    // check limit top to set popover show at bottom of marker
    // top-menu bar--height: 40px
    if (
      boundingClient.top - 40 <
      popoverDefaultHeight + gapPopoverMarker + gapPopover + offsetTop
    ) {
      positionStyle = {
        transform: "translate(-50%, 0)",
        top: `calc(100% + ${markerSize + gapPopoverMarker}px `,
        left: "50%",
      };
    }

    // check limit right to set popover show full in screen
    if (boundingClient.right + popoverHalfWidth > limitRight) {
      positionStyle = {
        transform: `translate(calc(-50% - ${
          boundingClient.right + popoverHalfWidth - limitRight
        }px), 0)`,
        bottom: !positionStyle.top
          ? `calc(100% + ${gapPopoverMarker}px)`
          : null,
        left: "50%",
        top: positionStyle.top,
      };
    }

    // check limit left to set popover show full in screen
    if (boundingClient.left < limitLeft) {
      positionStyle = {
        transform: `translate(calc(-50% - ${
          boundingClient.left - gapPopover - limitLeft
        }px), 0)`,
        bottom: !positionStyle.top
          ? `calc(100% + ${gapPopoverMarker}px)`
          : null,
        left: "50%",
        top: positionStyle.top,
      };
    }
  }
  return positionStyle;
};

export const getRelativePathUrl = (url: string): string => {
  const hasContextPath = checkHasContextPath();

  if (hasContextPath) {
    return `${getContextPath()}${url}`;
  }

  return url;
};

export const getContextPath = (): string => {
  return window.location.pathname.substring(
    0,
    window.location.pathname.indexOf("/", 2)
  );
};

export const checkHasContextPath = (): boolean => {
  return (
    [
      process.env.REACT_APP_CONTEXT_PATH_EN,
      process.env.REACT_APP_CONTEXT_PATH_VI,
    ].indexOf(getContextPath()) !== -1
  );
};

export const isImage = (url: string): boolean => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};
