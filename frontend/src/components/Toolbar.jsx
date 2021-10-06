import React from 'react';
import { GridToolbarDensitySelector, GridToolbarExport, GridToolbarColumnsButton, GridToolbarContainer, } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';


function Toolbar(props) {
    const { create, update, destroy, filterOption, isCreateDisabled, isUpdateDisabled, isDestroyDisabled, actions } = props

    return (
        <Grid container sx={{ padding: 1 }}>
            <Grid item xs={12}>
                <GridToolbarContainer>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <Button size="small" startIcon={<NoteAddOutlinedIcon />} onClick={create} disabled={isCreateDisabled}>Create</Button>
                    <Button size="small" startIcon={<EditOutlinedIcon />} onClick={update} disabled={isUpdateDisabled}>Edit</Button>
                    <Button size="small" startIcon={<DeleteOutlineOutlinedIcon />} onClick={destroy} disabled={isDestroyDisabled}>Delete</Button>
                    <GridToolbarExport />
                    {actions}
                </GridToolbarContainer>
            </Grid>
            <Grid item xs={12}>
                {filterOption}
            </Grid>
        </Grid>
    )
}

export default Toolbar