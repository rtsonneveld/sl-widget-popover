import { PopoverRef } from "../components/Popper";

const targetIsInsideClass = (target: Element, className: string) => {
    const parent = target.closest(`.${className}`);

    return !!parent;
};

/** NOTE: Default hardcoded mx-calendar for ignoreClassList because of annoying side effect of this widget combined with this popover widget */
export const eventOutsideTarget = (
    event: MouseEvent | TouchEvent | FocusEvent,
    popover: PopoverRef | undefined,
    menuTrigger: HTMLElement | null,
    ignoreClassList = "mx-calendar"
): boolean => {
    const target = event.target as Element;

    if (ignoreClassList) {
        const isInsideIgnoreClassList = ignoreClassList
            .split(" ")
            .every(className => targetIsInsideClass(target, className));

        if (isInsideIgnoreClassList) {
            return false;
        }
    }

    const targetInsideContentElement = menuTrigger?.contains(target);
    const targetInsideMenuElement = popover?.getMenuElement()?.contains(target);

    return !targetInsideContentElement && !targetInsideMenuElement;
};
