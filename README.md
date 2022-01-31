# SL Popover

Popover widget to show content in a styled popover element

## 1. Description

You can use this widget to render any content when interacting with the trigger. You can set the trigger on hover, left-click and right-click. When choosing right-click then the popover behaves like a context-menu. The widget will also work on mobile devices, the trigger will default to on-touch.

### 1.1 Browser example

<table><tbody><tr><td>Example 1</td><td>Example 2</td><td>Example 3</td></tr><tr><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/popover_browser_example.png" width="200"></td><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/popover_browser_example4.png" width="200"></td><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/popover_browser_example4.png" width="200"></td></tr></tbody></table>

## 2. Usage

* Place any content in the triggercontainer to trigger content-container
* Place any content in the content-container

### 2.1 Modeler example

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/modeler_example.png" width="300">
<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/modeler_example2.png" width="300">

### 2.2 Configuration example

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/popover_general_tab.png" width="600">

## 3. Use Cases

* This can be used to create a context menu on a page.
* This can be used with or without context.

## 4. Customization

Avoid using margins/padding on the widget itself, if you want to add padding/margins place these on the containers inside the widget.
If you want to style the active state of the trigger you can use the modifier ``.is-active``

To customize the content-container you can edit the styling with css using the classname:

* .sl-popover-content