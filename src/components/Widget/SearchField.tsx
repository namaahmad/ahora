import React from "react";
import { Icon, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputContainer from "./InputContainer";
interface Iprops {
    value?: string;
    onSearch: Function;
    placeholder?: string
}
interface IState {
    searchText: string,
}
class SearchField extends React.Component<Iprops, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            searchText: this.props.value || ''
        }

        this.search = this.search.bind(this);
        this.clear = this.clear.bind(this);
    }

    search(e: any) {
        let value = e.target.value;
        this.setState({ searchText: value });
        if (value && value.length >= 3 || (!value))
            this.props.onSearch(value);
    }

    clear() {
        this.setState({ searchText: '' });
        this.props.onSearch('');
    }

    render() {
        return (
            <InputContainer>
                <TextField size="small"
                    variant="outlined"
                    placeholder={this.props.placeholder}
                    value={this.state.searchText}
                    onChange={(e) => this.search(e)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                    }} />
            </InputContainer>
        )
    }
}

export default SearchField;