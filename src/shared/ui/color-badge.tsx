import { stringToHslColor } from "~/lib/colors";
import { Badge } from "./badge";

interface ColorBadgeProps {
  name: string;
}

export function ColorBadge(props: ColorBadgeProps) {
  const { name } = props;

  const color = stringToHslColor(name);

  return (
    <Badge variant="secondary" style={{ backgroundColor: color }}>
      {name}
    </Badge>
  );
}
