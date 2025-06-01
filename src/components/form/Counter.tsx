import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CounterProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const Counter = ({ count, onIncrease, onDecrease }: CounterProps) => {
  return (
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      <IconButton onClick={onDecrease} disabled={count <= 5}>
        <RemoveIcon />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {count}/15
      </Typography>
      <IconButton onClick={onIncrease} disabled={count >= 15}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default Counter;
