import { CircularProgress } from "@mui/material";

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

export default function AppLoading({ height = 23, width = 23, color = "white" }: Props) {
  return <CircularProgress style={{ height, width, color }} />;
}
