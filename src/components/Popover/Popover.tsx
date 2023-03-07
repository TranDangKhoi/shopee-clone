import {
  arrow,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useClick,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
type PopoverProps = {
  children?: React.ReactNode;
  renderPopover?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  initialOpen?: boolean;
  placement?: Placement;
};
const Popover = ({
  children,
  renderPopover,
  className,
  initialOpen = false,
  placement = "bottom-end",
  as: Element = "div",
}: PopoverProps) => {
  const arrowRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    middleware: [offset(10), shift(), arrow({ element: arrowRef })],
    placement: placement,
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  const showPopover = () => {
    setIsOpen(true);
  };
  const hidePopover = () => {
    setIsOpen(false);
  };
  const togglePopOver = (e: React.TouchEvent<any>) => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Element
      className={className}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
      onTouchEnd={togglePopOver}
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: "max-content",
                transformOrigin: `${middlewareData.arrow?.x}px top`,
                zIndex: 1,
              }}
              initial={{ opacity: 0, transform: "scale(0)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0)" }}
              transition={{ duration: 0.2 }}
              {...getFloatingProps()}
            >
              <div className="absolute top-0 left-0 h-5 w-full -translate-y-full"></div>
              <span
                className="absolute -translate-y-[98%] border-[11px] border-x-transparent border-t-transparent border-b-white"
                ref={arrowRef}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y,
                }}
              ></span>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
};

export default Popover;
