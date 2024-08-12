export type Mods = Record<string, boolean | string | undefined>;

export interface ClassNameProps {
  className?: string;
  mods?: Mods;
  additional?: Array<string | undefined>;
}

export function classNames({
  className = "",
  mods = {},
  additional = [],
}: ClassNameProps): string {
  return [
    className,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(" ");
}
