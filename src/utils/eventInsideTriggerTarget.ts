export const eventInsideTriggerTarget = (
    event: MouseEvent | TouchEvent | FocusEvent,
    menuTrigger: HTMLElement | null
): boolean => {
    const target = event.target as Element;
    const targetInsideContentElement = menuTrigger?.contains(target);

    return !!targetInsideContentElement;
};
