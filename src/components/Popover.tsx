import classNames from "classnames";
import React, { ReactNode, useEffect, ReactElement, createElement, useState, useRef } from "react";
import { eventInsideTarget } from "src/utils/eventInsideTarget";
import { eventInsideTriggerTarget } from "src/utils/eventInsideTriggerTarget";
import { eventOutsideTarget } from "src/utils/eventOutsideTarget";
import { PlacementEnum, TriggerModeEnum } from "typings/SLPopoverProps";
import Popper, { PopoverRef } from "./Popper";

interface Props {
    name: string;
    className: string;
    triggerMode: TriggerModeEnum;
    autoClose: boolean;
    showArrow: boolean;
    placement: PlacementEnum;
    popoverTriggerContent: ReactNode;
    popoverContent: ReactNode;
    offsetDistance: number;
}

declare let window: any;

export function Popover(props: Props): ReactElement {
    const [isVisible, _setIsVisible] = useState(false);
    const isVisibleRef = useRef(false);
    const [menuTrigger, setMenuTrigger] = useState<HTMLElement | null>(null);
    const visibleByFocusRef = useRef(false);
    const popover = useRef<PopoverRef>();

    const setIsVisible = (visible: boolean) => {
        isVisibleRef.current = visible;
        _setIsVisible(visible);
    };

    const setVisibleByFocus = (visible: boolean) => {
        visibleByFocusRef.current = visible;
    };

    const registerPublicApi = () => {
        if (window && !window.slPopover) {
            window.slPopover = {};
        }

        window.slPopover[props.name] = {
            hideMenu: () => hideMenu()
        };
    };

    const registerActivePopover = () => {
        if (window && !window.slPopover) {
            window.slPopover = {};
        }

        window.slPopover.activePopover = {
            name: props.name,
            autoClose: props.autoClose
        };
    };

    const showMenu = (x?: number, y?: number) => {
        if (window && window.slPopover) {
            const popoverName = window.slPopover.activePopover?.name;
            const autoClose = window.slPopover.activePopover?.autoClose;
            if (autoClose && popoverName && popoverName !== props.name) {
                if (window.slPopover[popoverName]) {
                    window.slPopover[popoverName].hideMenu();
                }
            }
        }

        if (!isVisibleRef.current) {
            popover?.current?.update();
            setIsVisible(true);
            registerActivePopover();
        }

        if (props.triggerMode === "rightClick") {
            if (x && y) {
                popover?.current?.updateVirtualElement(x, y);
                popover?.current?.update();
            }
        }
    };

    const hideMenu = () => {
        if (isVisibleRef.current) {
            setIsVisible(false);
        }
    };

    const outsidePointerEventListener = (event: MouseEvent | TouchEvent | FocusEvent) => {
        const targetOutside = eventOutsideTarget(event, popover.current, menuTrigger);

        if (targetOutside) {
            hideMenu();
        }
    };

    const outsideFocusEvent = (event: FocusEvent) => {
        const targetOutside = eventOutsideTarget(event, popover.current, menuTrigger);

        if (visibleByFocusRef.current && targetOutside) {
            hideMenu();
            setVisibleByFocus(false);
        }
    };

    const outsideHoverEvent = (event: MouseEvent) => {
        const targetOutside = eventOutsideTarget(event, popover.current, menuTrigger);

        if (targetOutside) {
            hideMenu();
        }
    };

    const initOutsideListener = () => {
        // document.addEventListener('focusout', outsideFocusEvent);

        if (props.triggerMode === "hover") {
            document.addEventListener("mouseover", outsideHoverEvent);
        } else {
            if (props.autoClose) {
                document.addEventListener("mousedown", outsidePointerEventListener);
                document.addEventListener("touchstart", outsidePointerEventListener);
            }
        }
    };

    const destroyOutsideListener = () => {
        document.removeEventListener("focusout", outsideFocusEvent);
        document.removeEventListener("mouseover", outsideHoverEvent);
        document.removeEventListener("mousedown", outsidePointerEventListener);
        document.removeEventListener("touchstart", outsidePointerEventListener);
    };

    const onHoverEvent = (event: MouseEvent) => {
        const insideTarget = eventInsideTriggerTarget(event, menuTrigger);

        if (insideTarget) {
            showMenu();
        }
    };

    const onClickEvent = (event: MouseEvent | TouchEvent) => {
        const insideTarget = eventInsideTriggerTarget(event, menuTrigger);

        if (insideTarget) {
            return isVisibleRef.current ? hideMenu() : showMenu();
        }
    };

    const onFocusEvent = (event: FocusEvent) => {
        const insideTarget = eventInsideTarget(event, popover.current, menuTrigger);

        if (insideTarget) {
            setVisibleByFocus(true);
            showMenu();
        }
    };

    const onContextMenuEvent = (event: MouseEvent) => {
        const insideTarget = eventInsideTriggerTarget(event, menuTrigger);

        if (insideTarget) {
            event.preventDefault();

            showMenu(event.clientX, event.clientY);
        }
    };

    const initInsideListener = () => {
        if (props.triggerMode === "leftClick") {
            document.addEventListener("mousedown", onClickEvent);
            document.addEventListener("touchstart", onClickEvent);
        }

        if (props.triggerMode === "hover") {
            document.addEventListener("mouseover", onHoverEvent);
        }

        if (props.triggerMode === "leftClick" || props.triggerMode === "hover") {
            // document.addEventListener('focusin', onFocusEvent)
        }

        if (props.triggerMode === "rightClick") {
            document.addEventListener("contextmenu", onContextMenuEvent);
        }
    };

    const destroyInsideListener = () => {
        document.removeEventListener("mousedown", onClickEvent);
        document.removeEventListener("touchstart", onClickEvent);
        document.removeEventListener("mouseover", onHoverEvent);
        document.removeEventListener("focusin", onFocusEvent);
        document.removeEventListener("contextmenu", onContextMenuEvent);
    };

    useEffect(() => {
        if (menuTrigger) {
            initInsideListener();
            initOutsideListener();
            registerPublicApi();
        }

        return () => {
            destroyOutsideListener();
            destroyInsideListener();
        };
    }, [menuTrigger]);

    const getPopoverTriggerClassnames = () => {
        return classNames({
            [`${props.className}`]: true,
            "sl-popover-trigger": true,
            "is-active": isVisible
        });
    };

    const renderMenuTrigger = () => (
        <div className={getPopoverTriggerClassnames()} ref={setMenuTrigger}>
            {props.popoverTriggerContent}
        </div>
    );

    return (
        <React.Fragment>
            {renderMenuTrigger()}
            {
                <Popper
                    className={props.className}
                    ref={popover}
                    visible={isVisible}
                    showArrow={props.showArrow}
                    trigger={menuTrigger}
                    menuContent={props.popoverContent}
                    placement={props.placement}
                    triggerMode={props.triggerMode}
                    offsetDistance={props.offsetDistance}
                />
            }
        </React.Fragment>
    );
}
