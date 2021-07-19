import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useHistory, useLocation } from 'react-router-dom';
import Loader from '../../components/Widget/Loader';
import SearchField from '../../components/Widget/SearchField';
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomTable from "../../components/Widget/Table";
import { useSelector } from 'react-redux';
import { getDictionary } from '../../redux/DictionaryRedux';
import { getList, Delete } from '../../utils/dataProvider';
import DeleteConfirmDialog from "../../components/Widget/ConfirmDialog";
export default function Products() {
  const dic = useSelector((state: any) => getDictionary(state.dictionary));
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentRow, setCurrentRow] = useState<any>(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [itemList, setItemList] = useState([]);
  const queryPage = useLocation().search.match(/page=([0-9]+)/)
  const queryPerPage = useLocation().search.match(/per_page=([0-9]+)/);
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 0);
  const [totalCount, setTotalCount] = useState(1);
  const perPage = Number(queryPerPage && queryPerPage[1] ? queryPerPage[1] : 10)
  const [page, setPage] = useState(currentPage);

  const pageChange = (event: any, newPage: any) => {

    currentPage !== newPage && history.push(`/app/products?page=${newPage}&per_page=${perPage}`)
  }
  const loadData = (currentPage: any, search = "") => {
    getList('api/products', { page: currentPage, per_page: perPage, search: search }).then((response: any) => {
      let data = response.data;
      if (data && data.items) {
        setItemList(data.items);
        setTotalCount(100);
      }
      setIsLoading(false);
    })
  };
  const onRowEdit = (row: any) => {
    history.push('/app/users/edit/' + row.id);
  };
  const onSearch = (value: string) => {
    loadData(currentPage, value);
  }
  const onRowDelete = (row: any) => {
    setCurrentRow(row);
    setShowConfirmDialog(true);
  };
  const onCloseDialog = (value: boolean) => {
    setShowConfirmDialog(false);
    if (value && currentRow) {
      Delete('api/products/' + currentRow?.id).then(() => {
        loadData(currentPage);
      })
    }

  }
  useEffect(() => {
    //if (currentPage !== page || (page == 0)) {
    setPage(currentPage);
    loadData(currentPage);
    //  }

  }, [currentPage, page])
  return (isLoading ? (<Loader />) :
    <>
      <PageTitle title={"Products"} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title={dic.users} noBodyPadding disableWidgetMenu
            toolbar={<SearchField onSearch={onSearch} placeholder={dic.search} />} >
            <CustomTable columns={[
              { id: 'name', label: 'name'},
              { id: 'price', label: 'price' },
              { id: 'quantity', label: 'quantity' },
              { id: 'updated_at', label:  'Update Date' },
              { id: 'created_at', label: 'Created Date' },
              { id: 'delete', label: 'Delete' },
            ]} data={itemList} totalCount={totalCount} onChangePage={pageChange} dic={dic} onRowDelete={onRowDelete} onRowEdit={onRowEdit} page={page} />
          </Widget>
        </Grid> 
      </Grid>
      <DeleteConfirmDialog Title={"Title"} Description={"Are you Delete Record?"} openDialog={showConfirmDialog} closeModal={onCloseDialog}
      />
    </>
  );
}
