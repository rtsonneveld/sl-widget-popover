import classNames from "classnames";
import React, { ReactNode, useEffect, ReactElement, createElement, useState, useRef } from "react";
import { eventInsideTarget } from "src/utils/eventInsideTarget";
import { eventInsideTriggerTarget } from "src/utils/eventInsideTriggerTarget";
import { eventOutsideTarget } from "src/utils/eventOutsideTarget";
import { PlacementEnum, TriggerModeEnum } from "typings/SLPopoverProps";
import Popper, { PopoverRef } from "./Popper";
import { useDelayVisible } from "src/hooks/useDelayVisible";

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
    hideTriggerClass: string;
}

declare let window: any;

export function Popover(props: Props): ReactElement {
    const [isVisible, _setIsVisible] = useState(false);
    const isVisibleRef = useRef(false);
    const [menuTrigger, setMenuTrigger] = useState<HTMLElement | null>(null);
    const shouldRender = useDelayVisible(isVisible);
    const visibleByFocusRef = useRef(false);
    const popover = useRef<PopoverRef>();

    const setIsVisible = (visible: boolean) => {
        isVisibleRef.current = visible;
        _setIsVisible(visible);
    };

    const setVisibleByFocus = (visible: boolean) => {
        visibleByFocusRef.current = visible;
    };

    const registerActivePopover = () => {
        if (window && !window.slPopover) {
            window.slPopover = {};
        }

        if (!window.slPopover.items) {
            window.slPopover.items = {};
        }

        window.slPopover.items[props.name] = {
            hideMenu: () => hideMenu()
        };

        window.slPopover.activePopover = {
            name: props.name,
            autoClose: props.autoClose,
            hideMenu: () => hideMenu()
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
        if (isVisibleRef.current) {
            const targetOutside = eventOutsideTarget(event, popover.current, menuTrigger);

            if (targetOutside) {
                hideMenu();
            }
        }
    };

    const outsideFocusEvent = (event: FocusEvent) => {
        if (isVisibleRef.current) {
            const targetOutside = eventOutsideTarget(event, popover.current, menuTrigger);

            if (visibleByFocusRef.current && targetOutside) {
                hideMenu();
                setVisibleByFocus(false);
            }
        }
    };

    const outsideHoverEvent = (event: MouseEvent) => {
        if (isVisibleRef.current) {
            const targetOutside = eventOutsideTarget(event, popover.current, menuTrigger);

            if (targetOutside) {
                hideMenu();
            }
        }
    };

    const initOutsideListener = () => {
        if (props.triggerMode === "hover") {
            document.addEventListener("mouseover", outsideHoverEvent);
        } else {
            if (props.autoClose) {
                document.addEventListener("pointerdown", outsidePointerEventListener);
            }
        }
    };

    const destroyOutsideListener = () => {
        document.removeEventListener("focusout", outsideFocusEvent);
        document.removeEventListener("mouseover", outsideHoverEvent);
        document.removeEventListener("pointerdown", outsidePointerEventListener);
    };

    const onHoverEvent = (event: MouseEvent) => {
        const insideTarget = eventInsideTriggerTarget(event, menuTrigger);

        if (insideTarget) {
            showMenu();
        }
    };

    const onClickEvent = (event: MouseEvent | TouchEvent | PointerEvent) => {
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
            document.addEventListener("pointerup", onClickEvent);
            // document.addEventListener("touchstart", onClickEvent);
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
        document.removeEventListener("pointerup", onClickEvent);
        // document.removeEventListener("touchstart", onClickEvent);
        document.removeEventListener("mouseover", onHoverEvent);
        document.removeEventListener("focusin", onFocusEvent);
        document.removeEventListener("contextmenu", onContextMenuEvent);
    };

    useEffect(() => {
        if (menuTrigger) {
            initInsideListener();
            initOutsideListener();
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

    function findVisibleNodeWithClass(node: any, root:any, checkClass: string): boolean {
        if (node.props && node.props.class && node.props.class.includes(checkClass)) {
            const visibilityKey = `${node.key}$visibility`;
            console.log("Find "+visibilityKey);
            if (!findNodeByKey(root, visibilityKey)) {
                return true;
            }
        }
    
        if (node.props && node.props.content) {
            for (const child of node.props.content) {
                if (findVisibleNodeWithClass(child, root, checkClass)) {
                    return true;
                }
            }
        }
        if (node.props && node.props.contents) {
            for (const child of node.props.contents) {
                if (findVisibleNodeWithClass(child, root, checkClass)) {
                    return true;
                }
            }
        }

        if (Array.isArray(node)) {
            for(const child of node) {
                if (findVisibleNodeWithClass(child, root, checkClass)) {
                    return true;
                }
            }
        }
    
        return false;
    }
    
    function findNodeByKey(node: any, key: string): Node | null {
        if (node.key === key) {
            return node;
        }

        console.log("Check "+JSON.stringify(node)+" for "+key);
    
        if (node.props && node.props.content) {
            for (const child of node.props.content) {
                const found = findNodeByKey(child, key);
                if (found) {
                    return found;
                }
            }
        }
        if (node.props && node.props.contents) {
            for (const child of node.props.contents) {
                const found = findNodeByKey(child, key);
                if (found) {
                    return found;
                }
            }
        }

        if (Array.isArray(node)) {
            for(const child of node) {
                const foundNode = findNodeByKey(child, key);
                if (foundNode) {
                    return foundNode;
                }
            }
        }
    
        return null;
    }
    

    const renderMenuTrigger = () => {
        
        console.info(JSON.stringify(props.popoverContent));

        const hasVisibleContent = (!props.hideTriggerClass) || findVisibleNodeWithClass(props.popoverContent, props.popoverContent, props.hideTriggerClass);

        return (
            <div>
            <span>Visible content: {hasVisibleContent?"true":"false"}</span>
            {hasVisibleContent && 
                <div className={getPopoverTriggerClassnames()} ref={setMenuTrigger}>
                    {props.popoverTriggerContent}
                </div>
            }
            
            </div>
        );
    };

    return (
        <React.Fragment>
            {renderMenuTrigger()}
            {shouldRender && (
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
            )}
        </React.Fragment>
    );
}
