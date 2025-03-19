/**
 * Configuration for all component types in the application
 * This file registers priorities and loading configs for different component types
 */
import { registerComponentConfig } from './component-optimization';

// Defines component configurations for different component types
export function registerAllComponentConfigurations() {
  // Clipboard components
  registerComponentConfig('clipboard', [
    { path: '../multiui/clipboard/_components/Clipboard_6', priority: 1 },
    { path: '../multiui/clipboard/_components/Clipboard_7', priority: 1 },
    { path: '../multiui/clipboard/_components/Clipboard_8', priority: 1 },
    { path: '../multiui/clipboard/_components/Clipboard_9', priority: 2 },
    { path: '../multiui/clipboard/_components/Clipboard_10', priority: 2 },
    { path: '../multiui/clipboard/_components/Clipboard_29', priority: 3 },
    { path: '../multiui/clipboard/_components/Clipboard_11', priority: 4 },
    { path: '../multiui/clipboard/_components/Clipboard_12', priority: 4 },
    // Additional clipboard components with lower priorities
    { path: '../multiui/clipboard/_components/Clipboard_13', priority: 10 },
    { path: '../multiui/clipboard/_components/Clipboard_14', priority: 10 },
    { path: '../multiui/clipboard/_components/Clipboard_15', priority: 11 },
    { path: '../multiui/clipboard/_components/Clipboard_21', priority: 11 },
    { path: '../multiui/clipboard/_components/Clipboard_22', priority: 12 },
    { path: '../multiui/clipboard/_components/Clipboard_23', priority: 12 },
    { path: '../multiui/clipboard/_components/Clipboard_24', priority: 13 },
    { path: '../multiui/clipboard/_components/Clipboard_25', priority: 13 },
    // And so on...
  ]);

  // Button components
  registerComponentConfig('buttons', [
    { path: '../multiui/buttons/_components/Button_1', priority: 1 },
    { path: '../multiui/buttons/_components/Button_2', priority: 1 },
    { path: '../multiui/buttons/_components/Button_3', priority: 2 },
    { path: '../multiui/buttons/_components/Button_4', priority: 2 },
    { path: '../multiui/buttons/_components/Button_5', priority: 3 },
    // Additional button components
  ]);

  // Card components
  registerComponentConfig('cards', [
    { path: '../multiui/cards/_components/Card_1', priority: 1 },
    { path: '../multiui/cards/_components/Card_2', priority: 1 },
    { path: '../multiui/cards/_components/Card_3', priority: 2 },
    { path: '../multiui/cards/_components/Card_4', priority: 2 },
    { path: '../multiui/cards/_components/Card_5', priority: 3 },
    // Additional card components
  ]);

  // Checkbox components
  registerComponentConfig('checkbox', [
    { path: '../multiui/checkbox/_components/Checkbox_1', priority: 1 },
    { path: '../multiui/checkbox/_components/Checkbox_2', priority: 1 },
    { path: '../multiui/checkbox/_components/Checkbox_3', priority: 2 },
    { path: '../multiui/checkbox/_components/Checkbox_4', priority: 2 },
    { path: '../multiui/checkbox/_components/Checkbox_5', priority: 3 },
    // Additional checkbox components
  ]);

  // Avatar components
  registerComponentConfig('avatar', [
    { path: '../multiui/avatar/_components/Avatar_1', priority: 1 },
    { path: '../multiui/avatar/_components/Avatar_2', priority: 1 },
    { path: '../multiui/avatar/_components/Avatar_3', priority: 2 },
    { path: '../multiui/avatar/_components/Avatar_4', priority: 2 },
    { path: '../multiui/avatar/_components/Avatar_5', priority: 3 },
    // Additional avatar components
  ]);

  // Breadcrumbs components
  registerComponentConfig('breadcrumbs', [
    { path: '../multiui/breadcrumbs/_components/Breadcrumbs_1', priority: 1 },
    { path: '../multiui/breadcrumbs/_components/Breadcrumbs_2', priority: 1 },
    { path: '../multiui/breadcrumbs/_components/Breadcrumbs_3', priority: 2 },
    { path: '../multiui/breadcrumbs/_components/Breadcrumbs_4', priority: 2 },
    { path: '../multiui/breadcrumbs/_components/Breadcrumbs_5', priority: 3 },
    // Additional breadcrumbs components
  ]);

  // Badges components
  registerComponentConfig('badges', [
    { path: '../multiui/badges/_components/Badge_1', priority: 1 },
    { path: '../multiui/badges/_components/Badge_2', priority: 1 },
    { path: '../multiui/badges/_components/Badge_3', priority: 2 },
    { path: '../multiui/badges/_components/Badge_4', priority: 2 },
    { path: '../multiui/badges/_components/Badge_5', priority: 3 },
    // Additional badges components
  ]);

  // Accordion components
  registerComponentConfig('accordian', [
    { path: '../multiui/accordian/_components/Accordian_1', priority: 1 },
    { path: '../multiui/accordian/_components/Accordian_2', priority: 1 },
    { path: '../multiui/accordian/_components/Accordian_3', priority: 2 },
    { path: '../multiui/accordian/_components/Accordian_4', priority: 2 },
    { path: '../multiui/accordian/_components/Accordian_5', priority: 3 },
    // Additional accordion components
  ]);

  // Progress bar components
  registerComponentConfig('circularprogressbar', [
    { path: '../multiui/circularprogressbar/_components/CircularProgressBar_1', priority: 1 },
    { path: '../multiui/circularprogressbar/_components/CircularProgressBar_2', priority: 1 },
    { path: '../multiui/circularprogressbar/_components/CircularProgressBar_3', priority: 2 },
    { path: '../multiui/circularprogressbar/_components/CircularProgressBar_4', priority: 2 },
    { path: '../multiui/circularprogressbar/_components/CircularProgressBar_5', priority: 3 },
    // Additional progress bar components
  ]);

  // Add more component types as needed
}

// Map of component types to their typical heights (used for virtualization)
export const componentHeights = {
  clipboard: 150,
  buttons: 100,
  cards: 200,
  checkbox: 80,
  avatar: 100,
  breadcrumbs: 80,
  badges: 60,
  accordian: 180,
  circularprogressbar: 150,
  // Add more as needed
}; 