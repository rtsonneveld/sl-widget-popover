import { ReactElement, createElement } from "react";
import { SLPopoverContainerProps } from "typings/SLPopoverProps";
import { Popover } from "./components/Popover";

import "./ui/SLPopover.css";

export function SLPopover(props: SLPopoverContainerProps): ReactElement {
    return <Popover
        {...props}
        className={props.class}
    />;
}
