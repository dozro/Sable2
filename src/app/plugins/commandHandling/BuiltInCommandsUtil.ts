import { CommandDefinition } from '$types/schemas/command';
import * as cmdListDef from './builtIn.commands.json';

export function getCmdDescription(cmdId: string): CommandDefinition {
  return cmdListDef.commands.find((cmd) => cmd.id === cmdId) as CommandDefinition;
}
