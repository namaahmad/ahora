import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableCell, TableContainer, Checkbox, TableFooter, TablePagination, TableRow, Paper, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { getAuth } from '../../redux/AuthRedux';
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props: any) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: any) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: any) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: any) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: any) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function CustomTable(props: any) {
    const classes = useStyles2();
    const auth = useSelector((state: any) => getAuth(state.AuthRedux));
    var permissions = new Array<any>();
    if (auth && auth.user) {
        permissions = auth.user.permission;
    }
    let dic = props.dic;
    let columns = props.columns;
    let rows = props.data ? props.data : [];
    let clientSide = props.clientSide ? props.clientSide : false;
    let checkBoxEnable = props.checkBoxEnable ? props.checkBoxEnable : false;
    let totalCount = props.totalCount;
    let onRowEdit = props.onRowEdit;
    let onRowDelete = props.onRowDelete;
    let onRowSelected = props.onRowSelected;
    const [page, setPage] = React.useState(0);
    const [selectedRows, setSelectedRows] = React.useState<Array<any>>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows = rows.length > 0 ? false : true;

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
        props.onChangePage(event, newPage);
    };
    const handleChangeSelected = (event: any, row: any) => {
        let selectedRowsClone = [...selectedRows];
        if (row == "AllSelected") {
            if (event.target.checked) {
                rows.forEach((element: any) => {
                    selectedRowsClone.push(element);
                });
            }
            else {
                selectedRowsClone = [];
            }

        }
        else {
            if (event.target.checked) {
                selectedRowsClone.push(row);
            }
            else {
                var indexOf = selectedRowsClone.findIndex(r => r === row);
                selectedRowsClone.splice(indexOf, 1);
            }
        }

        setSelectedRows(selectedRowsClone);
        if (onRowSelected) {
            onRowSelected(selectedRowsClone);
        }
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const renderRow = (column: any, row: any) => {
        const value = (column.id in row && row[column.id]) ? row[column.id] : null;
        switch (column.format) {
            case "render":
                return column.renderHtml(row);
            default:
                return value;
                break;
        }
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        {checkBoxEnable && <TableCell key="columnCheckbox"
                        >
                            <Checkbox
                                value="AllSelected"
                                checked={(selectedRows.length == rows.length && rows.length > 0) ? true : false}
                                onChange={e => handleChangeSelected(e, "AllSelected")}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </TableCell>
                        }
                        {columns && columns.map((column: any) => {

                            switch (column.id) {
                                case 'edit':
                                    return (<TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column?.minWidth }}
                                    >
                                        {permissions.includes(column.permission) && column.label}
                                    </TableCell>)
                                case 'delete':
                                    return (<TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column?.minWidth }}
                                    >
                                        { column.label}
                                    </TableCell>)
                                default:
                                    return (<TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column?.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>)
                            }

                        }
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {((rowsPerPage > 0 && clientSide)
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row: any) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {checkBoxEnable && <TableCell key="rowCheckbox"
                            >
                                <Checkbox
                                    onChange={e => handleChangeSelected(e, row)}
                                    checked={selectedRows.findIndex(r => r === row) > -1 ? true : false}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </TableCell>
                            }
                            {columns.map((column: any, index: any) => {


                                switch (column.id) {
                                    case 'edit':
                                        return <TableCell key={index} align={column.align ? column.align : "left"}>
                                            {permissions.includes(column.permission) &&
                                                <IconButton onClick={e => onRowEdit(row)}><EditIcon /></IconButton>
                                            }
                                        </TableCell>
                                    case 'delete':
                                        return <TableCell key={index} align={column.align ? column.align : "left"}>
                                            
                                                <IconButton onClick={e => onRowDelete(row)}><DeleteIcon /></IconButton>
                                            
                                        </TableCell>

                                    default:
                                        return (
                                            <TableCell key={index} align={column.align ? column.align : "left"}>
                                                {renderRow(column, row)}
                                            </TableCell>
                                        );
                                }

                            })}
                        </TableRow>
                    ))}

                    {emptyRows && (
                        <TableRow style={{ height: 53 * 2 }}>
                            <TableCell colSpan={6} >{dic.noDataFound}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                        <TablePagination
                            {...props}
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': dic.rowsPerPage },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter> */}
            </Table>
        </TableContainer>
    );
}