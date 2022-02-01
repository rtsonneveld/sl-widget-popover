# SL Popover

Popover widget to show content in a styled popover element

## 1\. Description

You can use this widget to render any content when interacting with the trigger. You can set the trigger on hover, left-click and right-click. When choosing right-click then the popover behaves like a context-menu and will position itself on the current mouse position. The widget will also work on mobile devices, the trigger will default to on-touch.

### 1.1 Browser example

<table><tbody><tr><td>Example 1</td><td>Example 2</td><td>Example 3</td></tr><tr><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/popover_browser_example.png" width="200"></td><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/popover_browser_example4.png" width="200"></td><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/popover_browser_example6.png" width="200"></td></tr></tbody></table>

## 2\. Usage

* Place any content in the trigger-container to trigger the content-container
* Place any content in the content-container

### 2.1 Modeler examples

<table><tbody><tr><td>Example 1</td><td>Example 2</td></tr><tr><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/modeler_example.png" width="300"></td><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/modeler_example_2.png" width="300"></td></tr></tbody></table>

### 2.2 Configuration example

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-popover/main/docs/images/popover_general_tab.png" width="600">

## 3\. Use Cases

* This can be used to create a context menu on a page when a user right-clicks an element.
* When you want to provide your users with more information about an item.
* This can be used with or without an context-object.

## 4\. Customization

Avoid using margins/padding on the widget itself, if you want to add padding/margins place these on the elements inside the trigger and/or content-container.
If the popover-content is visible the class ``is-active`` is applied to the trigger-container. For example, you can apply extra styling to elements inside the trigger whenever the content is triggered.