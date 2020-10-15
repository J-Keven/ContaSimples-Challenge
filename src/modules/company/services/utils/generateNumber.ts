interface IRequestDTO {
  min?: number;
  max?: number;
}

export default function generateNumber({
  min = 0,
  max = Number.MAX_VALUE,
}: IRequestDTO): number {
  return Math.floor(Math.random() * (max - min)) + min;
}
