/**
 * This file was generated from SLPopover.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
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
    autoClose: boolean;
    showArrow: boolean;
    placement: PlacementEnum;
    popoverTriggerContent: ReactNode;
    popoverContent: ReactNode;
}

export interface SLPopoverPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    triggerMode: TriggerModeEnum;
    autoClose: boolean;
    showArrow: boolean;
    placement: PlacementEnum;
    popoverTriggerContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    popoverContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
