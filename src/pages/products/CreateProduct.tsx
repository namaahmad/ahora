
import React from 'react'
import {
    Grid, Button, Typography, TextField, Paper, Divider, Avatar, InputLabel, Fab, Switch
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../components/Widget/Loader';
import { toast } from "react-toastify";
import { Post, PostForm } from '../../utils/dataProvider';
import { getDictionary } from '../../redux/DictionaryRedux';
import { History, LocationState } from "history";
import { RouteComponentProps } from 'react-router';
import { getAuth, UserInfo } from '../../redux/AuthRedux';
import PageTitle from "../../components/PageTitle/PageTitle";
interface Iprops {
    history: History<LocationState>;
    match: match<RouteComponentProps>;
}
interface IState {
    name: string,
    quantity: number,
    price: number,
    description:'',
    isLoading: boolean,
}
export interface match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}
class CreateFactor extends React.Component<Iprops, IState> {
    dic: any;
    static propTypes = {}
    constructor(props: any) {
        super(props);
        this.dic = props.Dic;
        this.state = {
            name: '',
            quantity: 0,
            price: 0,
            description:'',
            isLoading: false,
        }
    }
    componentWillMount() {


    }


    handleChange = (e: any) => {

        if (e.target.type == "checkbox") {
            this.setState({ [e.target.name]: e.target.checked } as Pick<IState, keyof IState>);
        }
        else
            this.setState({ [e.target.name]: e.target.value } as Pick<IState, keyof IState>)
    };
    stateToFormdata() {
        const form = new FormData();
        Object.keys(this.state).map(key => {
            let value = this.state as any;
            form.append(key, value[key]);
        })

        return form;
    }
    handleSubmit = (e: any) => {
        e.preventDefault();

        // this.setState({ isLoading: true });
        // let body = this.stateToFormdata();

        let body = { ...this.state };
        body.price = Number(body.price);
        body.quantity = Number(body.quantity);
        Post('api/products', body).then((result: any) => {
            this.setState({ isLoading: false });
            if (result && result.data && result.data.status) {
                this.props.history.replace('/app/factor');
            } else {
                toast.error('Error Register Data');
            }
        })



    }

    handleUploadClick = (event: any) => {
        let file = event.target.files[0];
        let name = event.target.name;
        if (file) {
            file.react_url = URL.createObjectURL(file);
            this.setState({ [name + "Src"]: file.react_url } as Pick<IState, keyof IState>)
            this.setState({ [name]: file } as Pick<IState, keyof IState>)
        }
    }
    render() {
        return (this.state.isLoading ? (<Loader />) :
            <>
                <PageTitle title="Create Product" />
                <Paper >

                    <form onSubmit={this.handleSubmit} autoComplete="off" >
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={8} md={8} >
                                <TextField name="name" onChange={this.handleChange} label="name"
                                    fullWidth value={this.state.name ? this.state.name : ''}
                                    inputProps={{ required: true }} />
                            </Grid>
                            <Grid item xs={8} md={8} >
                                <TextField type="number" name="price" onChange={this.handleChange} label="price"
                                    fullWidth value={this.state.price}
                                    inputProps={{ required: true }} />
                            </Grid>
                            <Grid item xs={8} md={8} >
                                <TextField type="number" name="quantity" onChange={this.handleChange} label="quantity"
                                    fullWidth value={this.state.quantity}
                                    inputProps={{ required: true }} />
                            </Grid>
                            <Grid item xs={8} md={8} >
                                <TextField multiline rows={4}  name="description" onChange={this.handleChange} label="description"
                                    fullWidth value={this.state.description}
                                    inputProps={{ required: true }} />
                            </Grid>

                            <Divider />

                            <Grid item xs={8} md={8} >
                                <Button type="submit" variant="outlined" color="primary"  >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </>
        )

    }
}

CreateFactor.propTypes = {
    Dic: PropTypes.object.isRequired,
}
const mapStateToProps = (state: any) => ({
    Dic: getDictionary(state.dictionary),
    Auth: getAuth(state.AuthRedux)
});
export default
    connect(
        mapStateToProps
    )(CreateFactor);