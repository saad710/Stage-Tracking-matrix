import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const StageTable = (props) => {
  const { result, headKey, tableValue } = props
  console.log(headKey)
  return (
    <TableContainer component={Paper} sx={{ width: 1250, padding: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: 'black' }}>
          <TableRow>
            <TableCell
              sx={{
                border: '3px solid #73c2fb',
                color: 'white',
                fontWeight: '600',
              }}
            >
              stage
            </TableCell>
            {headKey?.map((headData) => (
              <TableCell
                sx={{
                  border: '3px solid #73c2fb',
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                {headData}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {result?.map((row, dataindex) => (
            <TableRow
              key={dataindex}
              // sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <TableCell
                sx={{ border: '3px solid #73c2fb' }}
                component="th"
                scope="row"
              >
                {Object.keys(row)}
              </TableCell>
              {headKey.map((head) =>
                tableValue?.map(
                  (data, index) =>
                    index === dataindex && (
                      <TableCell
                        sx={{ border: '3px solid  #73c2fb' }}
                        key={index}
                        align="left"
                      >
                        {data[head]}
                      </TableCell>
                    ),
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StageTable
