import * as React from 'react';
import {Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';

const  Poll = (props) => {

    const onclick = () =>{
      console.log('clicked')
    }

    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Description: {props.description}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Option 1: {props.option1}, with {props.votes1} votes so far
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Option 2: {props.option2}, with {props.votes2} votes so far
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Option 3: {props.option3}, with {props.votes3} votes so far
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Option 4: {props.option4}, with {props.votes4} votes so far
          </Typography>
          

        </CardContent>
        <CardActions>
            <FormControl>
            <Select
            
            //onChange={}
            displayEmpty
            
            inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem value="" disabled>
                Placeholder
            </MenuItem>
            <MenuItem value={1}>{props.option1}</MenuItem>
            <MenuItem value={2}>{props.option2}</MenuItem>
            <MenuItem value={3}>{props.option3}</MenuItem>
            <MenuItem value={4}>{props.option4}</MenuItem>

            </Select>
            <FormHelperText>Placeholder</FormHelperText>
            </FormControl>

          <Button size="small">Submit</Button>
        </CardActions>
      </Card>
    );
  }

  
  export default (Poll);