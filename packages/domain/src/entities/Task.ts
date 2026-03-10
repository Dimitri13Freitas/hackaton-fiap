export class Task {
  constructor(
    public readonly id: string,
    public content: string,
    public columnId: string,
    public createAt: number,
  ) {}
}
