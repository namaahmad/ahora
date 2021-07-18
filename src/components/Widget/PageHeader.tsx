
import { Box, Divider, Icon, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

var useStyles = makeStyles(theme => ({
    item: {
        alignSelf: 'stretch',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#686868'
    }
}));

const PageHeader = (props: any) => {

    const classes = useStyles();

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                <Box display="flex" flexDirection="row" alignItems="center" flexWrap="nowrap">
                    {
                        Boolean(props.back) &&

                        <Link to={props.back} className={clsx(classes.item, "text-center")}>
                            <Box className="text-black">
                                <Icon>arrow_forward</Icon>
                            </Box>
                            <Box className="text-gray">
                                بازگشت
                            </Box>
                        </Link>
                    }
                    {
                        Boolean(props.back) &&
                        <Divider flexItem orientation="vertical" className="mx-16" />
                    }

                    <Box className={classes.item}>
                        <Typography variant="h2" color="primary" className={classes.title}>
                            {props.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {props.subTitle}
                        </Typography>
                    </Box>

                </Box>

                <Box>
                    {props.toolbar}
                </Box>

            </Box>
            <Divider />
        </Box>
    )
}

export default PageHeader;