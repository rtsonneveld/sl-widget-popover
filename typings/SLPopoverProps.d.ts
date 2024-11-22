/**
 * This file was generated from SLPopover.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export type TriggerModeEnum = "hover" | "leftClick" | "rightClick";

export type PlacementEnum = "top" | "topStart" | "topEnd" | "bottom" | "bottomStart" | "bottomEnd" | "right" | "rightStart" | "rightEnd" | "left" | "leftStart" | "leftEnd";

export interface SLPopoverContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    triggerMode: TriggerModeEnum;
    offsetDistance: number;
    autoClose: boolean;
    showArrow: boolean;
    placement: PlacementEnum;
    hideTriggerClass: string;
    popoverTriggerContent: ReactNode;
    popoverContent: ReactNode;
}

export interface SLPopoverPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    triggerMode: TriggerModeEnum;
    offsetDistance: number | null;
    autoClose: boolean;
    showArrow: boolean;
    placement: PlacementEnum;
    hideTriggerClass: string;
    popoverTriggerContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    popoverContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
}
