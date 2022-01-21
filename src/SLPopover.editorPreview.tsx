import { ReactElement, createElement } from "react";
import { SLPopoverPreviewProps } from "typings/SLPopoverProps";
import { Popover } from "./components/Popover";

let popoverIndex = 0;

export function preview(props: SLPopoverPreviewProps): ReactElement {

    return <Popover
        {...props}
        name={`popover-${popoverIndex++}`}
        popoverContent={<props.popoverContent.renderer><div /></props.popoverContent.renderer>}
        popoverTriggerContent={<props.popoverTriggerContent.renderer><div /></props.popoverTriggerContent.renderer>}
    />;
}

export function getPreviewCss(): string {
    return require("./ui/SLPopover.css");
}
