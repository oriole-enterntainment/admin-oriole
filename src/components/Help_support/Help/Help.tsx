import React, { useEffect, useState } from "react";
import styles from "./Help.module.css";
import { db, auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import { getDocs, collection,updateDoc,doc, where, limit, query, Timestamp } from "firebase/firestore";
import { DataGrid , GridColDef ,  GridToolbarContainer, GridToolbarExport,GridRenderCellParams, GridRowParams,GridActionsCellItem } from "@mui/x-data-grid"
import { constants } from "buffer";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { Button } from "react-bootstrap";

interface GridCellExpandProps {
  value: string;
  width: number;
}

function isOverflown(element: Element): boolean {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(
  props: GridCellExpandProps,
) {
  const { width, value } = props;
  const wrapper = React.useRef<HTMLDivElement | null>(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current!);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      if (nativeEvent.key === 'Escape') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

function renderCellExpand(params: GridRenderCellParams<any, string>) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}


const Help = () => {
  const [request, setRequest] = useState<any>([]);
  const navigate = useNavigate();
  const adminData = useSelector((state: RootStateOrAny) => state?.adminData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.adminData
  );
  const q1 = query(
    collection(db, "contactus"),
    where("isResolved", "==", false)
  );


  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70,renderCell: renderCellExpand },
    { field: 'name', headerName: 'Name', width: 140,renderCell: renderCellExpand },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      renderCell: renderCellExpand
    },
    {
      field: 'sent_at.seconds',
      headerName: 'Received At',
      width: 150,

      renderCell: (params : GridRenderCellParams<any, any>) =>(
        <strong>
          {new Date(params.row.sent_at.seconds*1000).toLocaleDateString()}
        </strong>
      )
    },
    {
      field: 'message',
      headerName: 'Message',
      type: 'string',
      width: 500,
      renderCell: renderCellExpand
      
    },
    
    {
      field : 'isResolved',
      headerName: 'Resolved',
      width: 100,
      renderCell : (params : GridRenderCellParams<any, any>) => (
        <>
        <strong>
          <Button
          variant="contained"
          color="blue"
          
          style={{ marginLeft: 16 }}
          tabIndex={params.hasFocus ? 0 : -1}
          onClick={() => {
            console.log(params.row.contactId);
            // console.log(params.row);
            handleUpdate(params.row.contactId);
          }}
          >
            Resolved
          </Button>
        </strong>

        </>
      )
    }
  ];


  const handleUpdate = async (contactId : string) => {
    console.log("contact ID",contactId);

    await updateDoc(doc(db, "contactus", contactId), {
      isResolved: true,
      resolvedAt: Timestamp.now()
    }).then(() => {
      console.log("Document successfully updated!");
      alert("Request Resolved");
      getRequests();
    })
    .catch((error) => {
      alert("Error updating document");
      console.error("Error updating document: ", error);
    }
    );
  }

  const getRequests = async () => {
    let constant: any = [];
    await getDocs(q1)
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          if (snapshot.exists()) {
            let id = snapshot.id;
           
            constant.push(snapshot.data());
           constant.map((e: any, index : number) => {
            e.id = index + 1
           })
          } else {
          }
        });
        setRequest(constant);
        console.log(constant);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    if (loggedIn && request.length === 0) {
      getRequests();
    } 
    if(!loggedIn){
      navigate("/");
    }
  },[adminData, request]);
  return (
    <div className={styles.main}>
      <h2 className={styles.h2}>Help and Support</h2>

      <DataGrid
      rows={request}
      // rowHeight={500}
      columns={columns}
      slots={{toolbar: CustomToolbar}}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      // checkboxSelection
    />
  </div>
  

  );
};

export default Help;
