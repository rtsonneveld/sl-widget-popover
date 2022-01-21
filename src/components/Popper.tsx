import { Placement, VirtualElement } from "@popperjs/core";
import classNames from "classnames";
import React, { createElement, ReactNode, useEffect, useImperativeHandle, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { PlacementEnum, TriggerModeEnum } from "../../typings/SLPopoverProps";
import { generateBoundingClientRect } from "../utils/generateBoundingClientRect";

interface Props {
    className: string;
    visible: boolean;
    showArrow: boolean;
    trigger: HTMLElement | null;
    menuContent: ReactNode;
    placement: PlacementEnum;
    triggerMode: TriggerModeEnum;
}

export interface PopoverRef {
    update: () => void;
    getMenuElement: () => HTMLElement | null;
    updateVirtualElement: (x: number, y: number) => void;
}

const virtualElement: VirtualElement = {
    getBoundingClientRect: generateBoundingClientRect()
}

const placementEnumMapping: {[key:string]: Placement} = {
    auto: 'auto',
    autoStart: 'auto-start',
    autoEnd: 'auto-end',
    top: 'top',
    topStart: 'top-start',
    topEnd: 'top-end',
    bottom: 'bottom',
    bottomStart: 'bottom-start',
    bottomEnd: 'bottom-end',
    right: 'right',
    rightStart: 'right-start',
    rightEnd: 'right-end',
    left: 'left',
    leftStart: 'left-start',
    leftEnd: 'left-end'
}

const useContextMenuPopper = (mode: TriggerModeEnum, elements: {
    virtualElement: VirtualElement,
    menuElement: HTMLElement | null,
    triggerElement: HTMLElement | null,
    arrowElement: HTMLElement | null
}, placement: PlacementEnum) => {
    if (mode === 'rightClick') {
        return usePopper(virtualElement, elements.menuElement, {
            placement: 'bottom-end'
        })
    }

    return usePopper(elements.triggerElement, elements.menuElement, {
        placement: placementEnumMapping[placement],
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: elements.arrowElement,
                    padding: 5
                }
            },
            {
                name: 'computeStyles',
                options: {
                    gpuAcceleration: false, // true by default
                }
            },
        ]
    })
}

const Popper = React.forwardRef<PopoverRef | undefined, Props>((props: Props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
    const {styles, attributes, update} = useContextMenuPopper(
        props.triggerMode,
        {
            virtualElement,
            triggerElement: props.trigger,
            menuElement,
            arrowElement
        },
        props.placement
    );

    useImperativeHandle(ref, () => ({
        update: () => {
            update?.();
        },
        getMenuElement: () => menuElement,
        updateVirtualElement: (x: number, y: number) => {
            virtualElement.getBoundingClientRect = generateBoundingClientRect(x, y);
            update?.();
        }
    }));

    const getClassNames = () => {
        return classNames(
            'sl-popover',
            {
                [props.className]: true,
                'is-visible': isVisible,
                'is-hidden': !isVisible,
            },
        )
    }

    const renderMenu = () => (
        <div
            ref={setMenuElement}
            role='menu'
            aria-hidden={!isVisible}
            className={getClassNames()}
            style={styles.popper}
            {...attributes.popper}
        >
            <div className={`sl-popover-content`}>
                {props.menuContent}
            </div>
            { props.showArrow && renderArrow() }
        </div>
    )

    const renderArrow = () => (
        props.triggerMode !== 'rightClick' && <div ref={setArrowElement} className={'sl-popover-arrow'} style={styles.arrow} {...attributes.arrow} />
    )

    useEffect(() => {
        let timeoutId: any;
        if (props.visible) {
            timeoutId = setTimeout(() => setIsVisible(true), 50);
        } else {
            setIsVisible(false)
        }

        return (() => clearTimeout(timeoutId))
    }, [props.visible])

    return (
        ReactDOM.createPortal(renderMenu(), document.body)
    )
})

export default Popper