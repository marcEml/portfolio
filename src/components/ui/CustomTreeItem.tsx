import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { ChevronDown, ChevronRight, Minus } from "lucide-react";
import { styled, alpha } from "@mui/material/styles";

export const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    minHeight: 44,
    padding: "6px 10px",
    margin: "3px 0",
    borderRadius: 3,
    color: "#4A5068",
    transition: "background-color 150ms ease, color 150ms ease",

    "&:hover": {
      backgroundColor: "#EEF3FB",
      color: "#2D3A8C",
    },

    "&.Mui-selected": {
      backgroundColor: "#EAF0FB",
      color: "#2D3A8C",
      fontWeight: 600,
    },

    "&.Mui-focused": {
      backgroundColor: "#EAF0FB",
    },
  },

  [`& .${treeItemClasses.iconContainer}`]: {
    width: 24,
    color: "#2D3A8C",
  },

  [`& .${treeItemClasses.label}`]: {
    fontFamily: "DM Sans, sans-serif",
    fontSize: "0.875rem",
  },

  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 12,
    paddingLeft: 14,
    borderLeft: `1px dashed ${alpha("#2D3A8C", 0.25)}`,
  },
}));

export function ExpandIcon() {
  return <ChevronRight size={16} />;
}

export function CollapseIcon() {
  return <ChevronDown size={16} />;
}

export function EndIcon() {
  return <Minus size={12} className="opacity-40" />;
}
