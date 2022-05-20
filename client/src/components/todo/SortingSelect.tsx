import React from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ITodo } from "redux/types/todo";

const sortByDateASC = (arr: ITodo[], key: string): ITodo[] => {
  return arr?.sort((a: any, b: any) => {
    var dateA = new Date(a[key]).getTime();
    var dateB = new Date(b[key]).getTime();
    return dateA > dateB ? 1 : -1;
  });
};

const sortByDateDSC = (arr: ITodo[], key: string): ITodo[] => {
  return arr?.sort((a: any, b: any) => {
    var dateA = new Date(a[key]).getTime();
    var dateB = new Date(b[key]).getTime();
    return dateA < dateB ? 1 : -1;
  });
};

type Props = {
  data: ITodo[];
  setSortedData: (p: ITodo[]) => void;
};

const SortingSelect: React.FC<Props> = ({
  data,
  setSortedData,
}): JSX.Element => {
  const [key, setKey] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setKey(event.target.value);
    if (event.target.value === "EXP_ASC") {
      const sorted = sortByDateASC(data, "expires");
      setSortedData(sorted);
    } else if (event.target.value === "EXP_DSC") {
      const sorted = sortByDateDSC(data, "expires");
      setSortedData(sorted);
    } else if (event.target.value === "INST_DSC") {
      const sorted = sortByDateDSC(data, "created_at");
      setSortedData(sorted);
    } else {
      const sorted = sortByDateASC(data, "created_at");
      setSortedData(sorted);
    }
  };

  return (
    <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id='simple-select-label'>Sort By</InputLabel>
      <Select
        labelId='simple-select-label'
        id='simple-select'
        value={key}
        onChange={handleChange}
        label='key'
      >
        <MenuItem value='INST_ASC'>Insertion (asc)</MenuItem>
        <MenuItem value='INST_DSC'>Insertion (dsc)</MenuItem>
        <MenuItem value='EXP_ASC'>Expiration (asc)</MenuItem>
        <MenuItem value='EXP_DSC'>Expiration (dsc)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortingSelect;
