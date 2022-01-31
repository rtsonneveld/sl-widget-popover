import { ReactElement, createElement } from "react";
import { SLPopoverContainerProps } from "typings/SLPopoverProps";
import { Popover } from "./components/Popover";

import "./ui/SLPopover.css";

export function SLPopover(props: SLPopoverContainerProps): ReactElement {
    return <Popover {...props} offsetDistance={props.offsetDistance ? props.offsetDistance : 0} className={props.class} />;
}
