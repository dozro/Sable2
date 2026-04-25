import { addToCommandRegistry, CommandRegistry } from '../commandRegistry';
import { cosmeticBuiltInCommands } from './cosmeticCommands';

export function loadBuildInCommands(): void {
  addToCommandRegistry(cosmeticBuiltInCommands(), CommandRegistry.BuiltIn);
}
