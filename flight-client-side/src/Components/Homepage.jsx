import TextField from "@mui/material/TextField";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import axios from "axios";
export const HomePage = () => {
  const [input, setInput] = useState({
    start: "",
    end: "",
  });
  const [data,setData]=useState([]);

  const handleChange = (e) => {
    let { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };
  const handleClick=()=>{
      axios.post("http://localhost:3002/routes/find",input).then(({data})=>{
          setData(data);
      }).catch((e)=>console.log(e.message));
  }

  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <TextField
          required
          id="start"
          label="start"
          placeholder="Start"
          onChange={handleChange}
        />
        <TextField
          required
          id="end"
          label="end"
          placeholder="End"
          onChange={handleChange}
        />
        <Button variant="contained" sx={{ margin: "10px" }} onClick={handleClick}>
          Search
        </Button>
      </div>
      <Table>
          <TableHead>
              <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>start</TableCell>
              <TableCell>end</TableCell>
              <TableCell>capacity</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {data.map((e)=>{
                  return(
                    <TableRow key={e._id}>
                    <TableCell>{e.company_name}</TableCell>
                    <TableCell>{e.cost}</TableCell>
                    <TableCell>{e.start_time}</TableCell>
                    <TableCell>{e.end_time}</TableCell>
                    <TableCell>{e.capacity}</TableCell>
                    </TableRow>
                  )
              })}
          </TableBody>
      </Table>
    </>
  );
};
