# Log Browser App for Enonic XP

<img align="right" alt="Log Browser Logo" src="https://rawgithub.com/aro/app-logbrowser/master/src/main/resources/assets/img/logbrowser.svg" width="128">

This app allows remote browsing of the XP log file.

## Features

- View and navigate XP log file remotely from the browser
- Search for text in the log
- Search using regular expressions or case sensitive match
- Highlighting of search text

## Keyboard shortcuts

The following keyboard shortcuts are available in the app:

| Keyboard Shortcut | Description |
| ----------- | ------------------- |
| <kbd>↓</kbd> | Navigate forward one line |
| <kbd>↑</kbd> | Navigate backward one line |
| <kbd>Page Down</kbd> | Navigate forward one page |
| <kbd>Page Up</kbd> | Navigate backward one page |
| <kbd>Home</kbd> | Navigate to the beginning of the file |
| <kbd>End</kbd> | Navigate to the end of the file |
| <kbd>SHIFT</kbd>+<kbd>F</kbd> | Scroll Forward, aka "tail -f" |
| <kbd>CONTROL</kbd>+<kbd>F</kbd> | Open the Search/Find dialog |

In addition the mouse wheel can be used for navigating up and down the file. 

<img alt="Log Browser screenshot" src="https://rawgithub.com/aro/app-logbrowser/master/src/main/resources/assets/img/screenshot.png" width="480">

## Releases and Compatibility

| App version | Required XP version |
| ----------- | ------------------- |
| 1.0.0 | 6.10.0 |


## Building and deploying

Build this application from the command line. Go to the root of the project and enter:

    ./gradlew clean build

To deploy the app, set `$XP_HOME` environment variable and enter:

    ./gradlew deploy

