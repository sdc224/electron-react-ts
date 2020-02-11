export default interface ITerminal {
  execute(command: string, args?: string[], cwd?: string): Promise<unknown>;
}
